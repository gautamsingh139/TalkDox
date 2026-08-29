import re

VAGUE_PATTERNS = [
    r'^(explain|tell me|describe|go on|continue)$',
    r'^(more|info|information|details?|and|so)$',
    r'^(explain this|tell me more|what does this mean|describe this|elaborate on this)$',
    r'^(yes|no|ok|okay|sure|fine|alright|got it|i see|hmm|hm|cool|nice|thanks)$',
    r'^(huh|what|why|how)$',  
]

def is_vague_query(question: str) -> bool:
    q = question.strip().lower().rstrip("?.!")

    if len(q.split()) == 1 and len(q) < 4:
        return True

    for pattern in VAGUE_PATTERNS:
        if re.fullmatch(pattern, q, re.IGNORECASE):
            return True

    return False

def get_clarification_question(question: str) -> str:
    q = question.strip().lower()
    if any(w in q for w in ["explain", "describe", "elaborate"]):
        return "Could you be more specific? What aspect or topic would you like me to explain from the document?"
    if any(w in q for w in ["summarize", "summary"]):
        return "Would you like a full document summary, or a summary of a specific section or topic?"
    if any(w in q for w in ["what", "how", "why"]) and len(q.split()) <= 2:
        return "Could you complete your question? What specifically would you like to know about the document?"
    return "Your question seems a bit broad. Could you provide more details about what you're looking for?"

def self_reflect_and_improve(question: str, context: str, initial_answer: str, llm) -> str:

    if len(initial_answer.split()) <= 20:
        return initial_answer

    if initial_answer.startswith("❌") or initial_answer.startswith("⚠️"):
        return initial_answer

    reflection_prompt = f"""You are a critical reviewer. A user asked a question and an AI gave an answer based on document context.

Your job:
1. Check if the answer is complete, accurate, and well-supported by the context
2. If it is good — respond with exactly: APPROVED
3. If it has gaps, vagueness, or missing details — respond with an improved version only (no preamble, no explanation)

Question: {question}
Document Context: {context[:3000]}
Initial Answer: {initial_answer}

Your verdict (either 'APPROVED' or the improved answer):"""

    try:
        response = llm.invoke(reflection_prompt)
        result = response.content.strip()
        if result.upper().startswith("APPROVED"):
            return initial_answer
        if len(result.split()) < len(initial_answer.split()) * 0.5:
            return initial_answer
        return result
    except Exception:
        return initial_answer


def apply_confidence_adaptation(answer: str, confidence: int) -> str:

    if confidence > 70:
        return answer

    if confidence < 45:
        return (
            answer +
            "\n\n⚠️ **Low Confidence:** The document may not contain strong evidence "
            "for this answer. Please verify from the source directly."
        )

    return (
        answer +
        "\n\n_ℹ️ Note: This answer is based on partially relevant sections. "
        "Consider rephrasing your question for more precise results._"
    )


def get_confidence(docs, question: str) -> int:

    if not docs:
        return 0

    base_confidence = min(len(docs) * 15, 70)  

    avg_length = sum(len(doc.page_content) for doc in docs) / len(docs)
    length_boost = min(int(avg_length / 50), 15)  

    stopwords = {'the', 'is', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to',
                 'for', 'of', 'with', 'what', 'how', 'why', 'when', 'where', 'who',
                 'which', 'this', 'that', 'these', 'those', 'be', 'been', 'being',
                 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
                 'should', 'may', 'might', 'can', 'are', 'was', 'were', 'me', 'my',
                 'i', 'you', 'we', 'they', 'it', 'as', 'by', 'from', 'about'}

    keywords = set(re.findall(r'\w+', question.lower())) - stopwords

    if keywords:
        overlap_count = 0
        for doc in docs:
            doc_words = set(re.findall(r'\w+', doc.page_content.lower()))
            if keywords & doc_words:
                overlap_count += 1
        keyword_boost = min(int((overlap_count / len(docs)) * 15), 15)
    else:
        keyword_boost = 10  

    total = base_confidence + length_boost + keyword_boost

    return min(max(total, 35), 95)  