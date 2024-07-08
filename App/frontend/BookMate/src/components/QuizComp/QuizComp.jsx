import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../userContext.js";
import { useNavigate } from "react-router-dom";
import QuestionCluster from "../QuestionCluster/QuestionCluster";
import QuestionsData from "../QuestionData";

const QuizComp = ({ setStartQuiz }) => {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();
	const [currentCluster, setCurrentCluster] = useState(0);
	const [answers, setAnswers] = useState({});
	const [loading, setLoading] = useState(true);

	const fetchQuizData = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/get-answers?LibID=${user.LibID}`
			);
			const data = await response.json();
			console.log(data);
			if (data.answers) {
				setAnswers(data.answers);
			}
		} catch (error) {
			console.error("Error fetching quiz data:", error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!user) {
			navigate("/login");
		} else {
			fetchQuizData();
		}
	}, [user, navigate]);

	const handleNext = () => {
		setCurrentCluster((prev) => prev + 1);
	};

	const handlePrevious = () => {
		setCurrentCluster((prev) => prev - 1);
	};

	const saveAnswers = (newAnswers) => {
		setAnswers((prev) => {
			const updatedAnswers = { ...prev, ...newAnswers };
			return updatedAnswers;
		});
	};

	const exitQuiz = () => {
		navigate("/quiz");
		setStartQuiz(false);
	};

	const handleSubmit = async () => {
		const answerString = Object.values(answers).join("");
		if (answerString.length < 20) {
			alert("Please choose an option for all questions.");
		} else {
			try {
				await fetch("http://localhost:3000/save-answers", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ LibID: user.LibID, answers: answerString }),
				});
				navigate("/quiz");
				setStartQuiz(false);
			} catch (error) {
				console.error("Error saving answers:", error.message);
			}
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<h1 className="text-4xl text-secondary font-poppins font-bold my-3 text-center">
				The Quiz
			</h1>

			<div className="flex justify-center space-x-4 mt-4">
				<button
					onClick={handlePrevious}
					disabled={currentCluster === 0}
					className="btn btn-secondary"
					style={{ width: "120px" }}
				>
					Previous
				</button>
				{currentCluster === QuestionsData.length - 1 ? (
					<button
						onClick={handleSubmit}
						className="btn btn-secondary"
						style={{ width: "120px" }}
					>
						Submit
					</button>
				) : (
					<button
						onClick={handleNext}
						className="btn btn-secondary"
						style={{ width: "120px" }}
					>
						Next
					</button>
				)}
			</div>

			<div>
				<QuestionCluster
					cluster={QuestionsData[currentCluster]}
					answers={answers}
					saveAnswers={saveAnswers}
				/>
				<div className="flex justify-center space-x-4 mt-4">
					<button
						onClick={handlePrevious}
						disabled={currentCluster === 0}
						className="btn btn-secondary"
						style={{ width: "120px" }}
					>
						Previous
					</button>
					{currentCluster === QuestionsData.length - 1 ? (
						<button
							onClick={handleSubmit}
							className="btn btn-secondary"
							style={{ width: "120px" }}
						>
							Submit
						</button>
					) : (
						<button
							onClick={handleNext}
							className="btn btn-secondary"
							style={{ width: "120px" }}
						>
							Next
						</button>
					)}
				</div>
			</div>
			<div className="flex justify-center mt-4">
				<button onClick={exitQuiz} className="btn btn-secondary">
					Exit Quiz
				</button>
			</div>
		</>
	);
};

export default QuizComp;
