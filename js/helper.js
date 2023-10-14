const formatData = (questionData) => {
  const result = questionData.map((item) => {
    const questionObject = { question: item.question };
    const answers = [...item.incorrect_answers];
    const correctAnswerindex = Math.floor(Math.random() * 4);
    answers.splice(correctAnswerindex, 0, item.correct_answer);
    questionObject.answers = answers;
    questionObject.correctAnswerindex = correctAnswerindex;
    return questionObject;
  });
  return result;
};
export default formatData;
