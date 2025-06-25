// Quiz Application JavaScript

class QuizApp {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.timer = null;
        this.timeLeft = 300; // 5 minutes in seconds
        this.selectedCategory = '';
        this.shuffledQuestions = [];
        this.startTime = null;
        this.isQuizActive = false;
        
        this.initializeElements();
        this.initializeEventListeners();
        this.initializeTheme();
        this.showScreen('categoryScreen');
    }

    // Question Bank
    questionBank = {
        javascript: [
            {
                type: 'multiple',
                question: 'What is the correct way to declare a variable in JavaScript?',
                options: ['var myVar = 5;', 'variable myVar = 5;', 'v myVar = 5;', 'declare myVar = 5;'],
                correct: 0
            },
            {
                type: 'true-false',
                question: 'JavaScript is a compiled language.',
                correct: false
            },
            {
                type: 'fill',
                question: 'The _____ method is used to add an element to the end of an array.',
                correct: ['push', 'Push']
            },
            {
                type: 'multiple',
                question: 'Which of the following is NOT a JavaScript data type?',
                options: ['String', 'Boolean', 'Float', 'Undefined'],
                correct: 2
            },
            {
                type: 'multiple',
                question: 'What does DOM stand for?',
                options: ['Document Object Model', 'Data Object Management', 'Dynamic Object Manipulation', 'Document Oriented Markup'],
                correct: 0
            },
            {
                type: 'true-false',
                question: 'The === operator checks both value and type.',
                correct: true
            },
            {
                type: 'fill',
                question: 'The _____ loop is used to iterate over object properties.',
                correct: ['for...in', 'for in']
            },
            {
                type: 'multiple',
                question: 'Which method is used to remove the last element from an array?',
                options: ['pop()', 'push()', 'shift()', 'unshift()'],
                correct: 0
            },
            {
                type: 'multiple',
                question: 'What is the result of typeof null in JavaScript?',
                options: ['null', 'undefined', 'object', 'boolean'],
                correct: 2
            },
            {
                type: 'true-false',
                question: 'Arrow functions have their own "this" context.',
                correct: false
            }
        ],
        html: [
            {
                type: 'multiple',
                question: 'Which HTML tag is used to define an internal style sheet?',
                options: ['<style>', '<css>', '<script>', '<link>'],
                correct: 0
            },
            {
                type: 'true-false',
                question: 'HTML stands for HyperText Markup Language.',
                correct: true
            },
            {
                type: 'fill',
                question: 'The _____ attribute specifies an alternate text for an image.',
                correct: ['alt', 'Alt']
            },
            {
                type: 'multiple',
                question: 'Which HTML element is used to specify a footer for a document?',
                options: ['<bottom>', '<section>', '<footer>', '<foot>'],
                correct: 2
            },
            {
                type: 'multiple',
                question: 'What is the correct HTML for creating a hyperlink?',
                options: ['<a url="http://example.com">Example</a>', '<a href="http://example.com">Example</a>', '<a>http://example.com</a>', '<a name="http://example.com">Example</a>'],
                correct: 1
            },
            {
                type: 'true-false',
                question: 'The <br> tag requires a closing tag.',
                correct: false
            },
            {
                type: 'fill',
                question: 'The _____ element represents the largest heading.',
                correct: ['h1', 'H1']
            },
            {
                type: 'multiple',
                question: 'Which attribute is used to specify that an input field must be filled out?',
                options: ['required', 'mandatory', 'validate', 'placeholder'],
                correct: 0
            },
            {
                type: 'multiple',
                question: 'What does HTML stand for?',
                options: ['Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'HyperText Markup Language', 'Hyperlinking Text Markup Language'],
                correct: 2
            },
            {
                type: 'true-false',
                question: 'The <img> tag can be used without the src attribute.',
                correct: false
            }
        ],
        css: [
            {
                type: 'multiple',
                question: 'Which CSS property is used to change the text color?',
                options: ['color', 'text-color', 'font-color', 'text-style'],
                correct: 0
            },
            {
                type: 'true-false',
                question: 'CSS stands for Cascading Style Sheets.',
                correct: true
            },
            {
                type: 'fill',
                question: 'The _____ property is used to set the background color.',
                correct: ['background-color', 'background']
            },
            {
                type: 'multiple',
                question: 'How do you select an element with id "header" in CSS?',
                options: ['.header', '#header', 'header', '*header'],
                correct: 1
            },
            {
                type: 'multiple',
                question: 'Which CSS property controls the text size?',
                options: ['font-style', 'text-size', 'font-size', 'text-style'],
                correct: 2
            },
            {
                type: 'true-false',
                question: 'The box-model includes margin, border, padding, and content.',
                correct: true
            },
            {
                type: 'fill',
                question: 'The _____ property is used to make text bold.',
                correct: ['font-weight', 'fontWeight']
            },
            {
                type: 'multiple',
                question: 'Which CSS property is used to change the font of an element?',
                options: ['font-family', 'font-style', 'font-weight', 'font-size'],
                correct: 0
            },
            {
                type: 'multiple',
                question: 'What is the default value of the position property?',
                options: ['absolute', 'relative', 'static', 'fixed'],
                correct: 2
            },
            {
                type: 'true-false',
                question: 'Flexbox is a one-dimensional layout method.',
                correct: true
            }
        ],
        general: [
            {
                type: 'multiple',
                question: 'Which programming language is known as the "mother of all languages"?',
                options: ['C', 'Assembly', 'FORTRAN', 'COBOL'],
                correct: 0
            },
            {
                type: 'true-false',
                question: 'Python is an interpreted language.',
                correct: true
            },
            {
                type: 'fill',
                question: 'The process of finding and fixing bugs is called _____.',
                correct: ['debugging', 'Debugging']
            },
            {
                type: 'multiple',
                question: 'What does API stand for?',
                options: ['Application Programming Interface', 'Advanced Programming Integration', 'Automated Program Interaction', 'Application Process Integration'],
                correct: 0
            },
            {
                type: 'multiple',
                question: 'Which data structure follows LIFO (Last In, First Out)?',
                options: ['Queue', 'Stack', 'Array', 'Linked List'],
                correct: 1
            },
            {
                type: 'true-false',
                question: 'Binary uses only 0s and 1s.',
                correct: true
            },
            {
                type: 'fill',
                question: 'The _____ protocol is used for secure web communication.',
                correct: ['HTTPS', 'https']
            },
            {
                type: 'multiple',
                question: 'What does SQL stand for?',
                options: ['Structured Query Language', 'Standard Query Language', 'Sequential Query Language', 'Simple Query Language'],
                correct: 0
            },
            {
                type: 'multiple',
                question: 'Which of the following is a version control system?',
                options: ['Git', 'Docker', 'Node.js', 'React'],
                correct: 0
            },
            {
                type: 'true-false',
                question: 'Machine learning is a subset of artificial intelligence.',
                correct: true
            }
        ]
    };

    initializeElements() {
        // Screen elements
        this.categoryScreen = document.getElementById('categoryScreen');
        this.quizScreen = document.getElementById('quizScreen');
        this.resultsScreen = document.getElementById('resultsScreen');
        
        // Quiz elements
        this.questionCounter = document.getElementById('questionCounter');
        this.categoryBadge = document.getElementById('categoryBadge');
        this.timeDisplay = document.getElementById('timeDisplay');
        this.progressBar = document.getElementById('progressBar');
        this.questionText = document.getElementById('questionText');
        
        // Answer containers
        this.optionsContainer = document.getElementById('optionsContainer');
        this.tfContainer = document.getElementById('tfContainer');
        this.fillContainer = document.getElementById('fillContainer');
        this.fillAnswer = document.getElementById('fillAnswer');
        
        // Navigation
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.submitBtn = document.getElementById('submitBtn');
        
        // Results elements
        this.scoreText = document.getElementById('scoreText');
        this.percentageText = document.getElementById('percentageText');
        this.correctCount = document.getElementById('correctCount');
        this.incorrectCount = document.getElementById('incorrectCount');
        this.timeTaken = document.getElementById('timeTaken');
        this.analysisContainer = document.getElementById('analysisContainer');
        
        // Theme toggle
        this.themeToggle = document.getElementById('themeToggle');
    }

    initializeEventListeners() {
        // Category selection
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectedCategory = card.dataset.category;
                this.startQuiz();
            });
        });
        
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.submitBtn.addEventListener('click', () => this.submitAnswer());
        
        // Answer selection
        this.optionsContainer.addEventListener('click', (e) => {
            if (e.target.closest('.option') && !e.target.closest('.option').classList.contains('disabled')) {
                this.selectOption(e.target.closest('.option'));
            }
        });
        
        this.tfContainer.addEventListener('click', (e) => {
            if (e.target.closest('.tf-option') && !e.target.closest('.tf-option').classList.contains('disabled')) {
                this.selectTFOption(e.target.closest('.tf-option'));
            }
        });
        
        this.fillAnswer.addEventListener('input', () => {
            this.submitBtn.disabled = this.fillAnswer.value.trim() === '';
        });
        
        // Results buttons
        document.getElementById('restartBtn').addEventListener('click', () => this.resetQuiz());
        document.getElementById('newCategoryBtn').addEventListener('click', () => this.showScreen('categoryScreen'));
        
        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isQuizActive) {
                if (e.key === 'ArrowLeft' && !this.prevBtn.disabled) {
                    this.previousQuestion();
                } else if (e.key === 'ArrowRight' && !this.nextBtn.disabled) {
                    this.nextQuestion();
                } else if (e.key === 'Enter' && !this.submitBtn.disabled) {
                    this.submitAnswer();
                }
            }
        });
    }

    initializeTheme() {
        const savedTheme = 'light'; // Removed localStorage usage
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        // Removed localStorage usage
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const icon = this.themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.style.display = 'none';
        });
        document.getElementById(screenName).style.display = 'block';
    }

    startQuiz() {
        this.resetQuizData();
        this.shuffledQuestions = this.shuffleArray([...this.questionBank[this.selectedCategory]]);
        this.shuffleAnswerOptions();
        this.isQuizActive = true;
        this.startTime = Date.now();
        
        this.categoryBadge.textContent = this.selectedCategory.charAt(0).toUpperCase() + this.selectedCategory.slice(1);
        this.showScreen('quizScreen');
        this.startTimer();
        this.displayQuestion();
    }

    resetQuizData() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.timeLeft = 300;
        this.isQuizActive = false;
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    shuffleAnswerOptions() {
        this.shuffledQuestions.forEach(question => {
            if (question.type === 'multiple') {
                const correctAnswer = question.options[question.correct];
                question.options = this.shuffleArray([...question.options]);
                question.correct = question.options.indexOf(correctAnswer);
            }
        });
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimeDisplay();
            
            if (this.timeLeft <= 0) {
                this.endQuiz();
            }
        }, 1000);
    }

    updateTimeDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    displayQuestion() {
        const question = this.shuffledQuestions[this.currentQuestionIndex];
        
        // Update UI
        this.questionCounter.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.shuffledQuestions.length}`;
        this.questionText.textContent = question.question;
        this.updateProgressBar();
        
        // Hide all answer containers
        this.optionsContainer.style.display = 'none';
        this.tfContainer.style.display = 'none';
        this.fillContainer.style.display = 'none';
        
        // Clear any previous feedback elements
        this.clearFeedbackElements();
        
        // Show appropriate answer container
        switch (question.type) {
            case 'multiple':
                this.displayMultipleChoice(question);
                break;
            case 'true-false':
                this.displayTrueFalse(question);
                break;
            case 'fill':
                this.displayFillBlank(question);
                break;
        }
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Restore previous answer if exists
        this.restorePreviousAnswer();
    }

    // NEW METHOD: Clear any feedback elements from previous questions
    clearFeedbackElements() {
        // Remove any correct answer display elements from fill containers
        const correctAnswerDisplays = this.fillContainer.querySelectorAll('.correct-answer-display');
        correctAnswerDisplays.forEach(element => element.remove());
        
        // Reset fill input styling
        this.fillAnswer.style.borderColor = '';
        this.fillAnswer.style.backgroundColor = '';
    }

    displayMultipleChoice(question) {
        this.optionsContainer.style.display = 'flex';
        const options = this.optionsContainer.querySelectorAll('.option');
        
        options.forEach((option, index) => {
            const label = option.querySelector('label');
            const input = option.querySelector('input');
            
            label.textContent = question.options[index];
            input.value = index;
            option.classList.remove('selected', 'correct', 'incorrect', 'disabled');
            input.checked = false;
        });
    }

    displayTrueFalse(question) {
        this.tfContainer.style.display = 'flex';
        const options = this.tfContainer.querySelectorAll('.tf-option');
        
        options.forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect', 'disabled');
            const input = option.querySelector('input');
            input.checked = false;
        });
    }

    displayFillBlank(question) {
        this.fillContainer.style.display = 'flex';
        this.fillAnswer.value = '';
        this.fillAnswer.disabled = false;
        // Reset styling
        this.fillAnswer.style.borderColor = '';
        this.fillAnswer.style.backgroundColor = '';
    }

    selectOption(optionElement) {
        // Clear previous selections
        this.optionsContainer.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
            opt.querySelector('input').checked = false;
        });
        
        // Select current option
        optionElement.classList.add('selected');
        optionElement.querySelector('input').checked = true;
        this.submitBtn.disabled = false;
    }

    selectTFOption(optionElement) {
        // Clear previous selections
        this.tfContainer.querySelectorAll('.tf-option').forEach(opt => {
            opt.classList.remove('selected');
            opt.querySelector('input').checked = false;
        });
        
        // Select current option
        optionElement.classList.add('selected');
        optionElement.querySelector('input').checked = true;
        this.submitBtn.disabled = false;
    }

    submitAnswer() {
        const question = this.shuffledQuestions[this.currentQuestionIndex];
        let userAnswer = null;
        let isCorrect = false;
        
        switch (question.type) {
            case 'multiple':
                const selectedOption = this.optionsContainer.querySelector('input[name="answer"]:checked');
                if (selectedOption) {
                    userAnswer = parseInt(selectedOption.value);
                    isCorrect = userAnswer === question.correct;
                    this.showMultipleChoiceFeedback(question, userAnswer, isCorrect);
                }
                break;
                
            case 'true-false':
                const selectedTF = this.tfContainer.querySelector('input[name="tfAnswer"]:checked');
                if (selectedTF) {
                    userAnswer = selectedTF.value === 'true';
                    isCorrect = userAnswer === question.correct;
                    this.showTrueFalseFeedback(question, userAnswer, isCorrect);
                }
                break;
                
            case 'fill':
                userAnswer = this.fillAnswer.value.trim();
                isCorrect = question.correct.some(answer => 
                    answer.toLowerCase() === userAnswer.toLowerCase()
                );
                this.showFillBlankFeedback(question, userAnswer, isCorrect);
                break;
        }
        
        // Store answer
        this.userAnswers[this.currentQuestionIndex] = {
            question: question.question,
            userAnswer: userAnswer,
            correctAnswer: question.correct,
            isCorrect: isCorrect,
            type: question.type,
            options: question.options || null
        };
        
        if (isCorrect) {
            this.score++;
        }
        
        // Disable further input
        this.disableAnswerInputs();
        this.submitBtn.disabled = true;
        this.nextBtn.disabled = false;
        
        // Auto-advance after 2 seconds if not last question
        if (this.currentQuestionIndex < this.shuffledQuestions.length - 1) {
            setTimeout(() => {
                if (this.isQuizActive) {
                    this.nextQuestion();
                }
            }, 2000);
        } else {
            // Last question - show finish button
            this.nextBtn.textContent = 'Finish Quiz';
            this.nextBtn.innerHTML = '<i class="fas fa-flag-checkered"></i> Finish Quiz';
        }
    }

    showMultipleChoiceFeedback(question, userAnswer, isCorrect) {
        const options = this.optionsContainer.querySelectorAll('.option');
        
        options.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === userAnswer && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
    }

    showTrueFalseFeedback(question, userAnswer, isCorrect) {
        const options = this.tfContainer.querySelectorAll('.tf-option');
        
        options.forEach(option => {
            const value = option.dataset.option === 'true';
            if (value === question.correct) {
                option.classList.add('correct');
            } else if (value === userAnswer && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
    }

    showFillBlankFeedback(question, userAnswer, isCorrect) {
        // Clear any existing feedback elements first
        this.clearFeedbackElements();
        
        this.fillAnswer.style.borderColor = isCorrect ? 'var(--success-color)' : 'var(--error-color)';
        this.fillAnswer.style.backgroundColor = isCorrect ? 'rgba(72, 187, 120, 0.1)' : 'rgba(245, 101, 101, 0.1)';
        
        if (!isCorrect) {
            // Show correct answer
            const correctAnswerDiv = document.createElement('div');
            correctAnswerDiv.className = 'correct-answer-display';
            correctAnswerDiv.innerHTML = `<small>Correct answer: <strong>${question.correct[0]}</strong></small>`;
            correctAnswerDiv.style.marginTop = '0.5rem';
            correctAnswerDiv.style.color = 'var(--success-color)';
            this.fillContainer.appendChild(correctAnswerDiv);
        }
    }

    disableAnswerInputs() {
        // Disable multiple choice options
        this.optionsContainer.querySelectorAll('.option').forEach(option => {
            option.classList.add('disabled');
        });
        
        // Disable true/false options
        this.tfContainer.querySelectorAll('.tf-option').forEach(option => {
            option.classList.add('disabled');
        });
        
        // Disable fill-in-the-blank
        this.fillAnswer.disabled = true;
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.shuffledQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        } else {
            this.endQuiz();
        }
    }

    updateProgressBar() {
        const progress = ((this.currentQuestionIndex + 1) / this.shuffledQuestions.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }

    updateNavigationButtons() {
        this.prevBtn.disabled = this.currentQuestionIndex === 0;
        
        // Check if current question has been answered
        const hasAnswer = this.userAnswers[this.currentQuestionIndex];
        
        if (hasAnswer) {
            this.submitBtn.disabled = true;
            this.nextBtn.disabled = false;
            if (this.currentQuestionIndex === this.shuffledQuestions.length - 1) {
                this.nextBtn.innerHTML = '<i class="fas fa-flag-checkered"></i> Finish Quiz';
            }
        } else {
            this.submitBtn.disabled = true;
            this.nextBtn.disabled = true;
            this.nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
        }
    }

    restorePreviousAnswer() {
        const previousAnswer = this.userAnswers[this.currentQuestionIndex];
        if (!previousAnswer) return;
        
        const question = this.shuffledQuestions[this.currentQuestionIndex];
        
        switch (question.type) {
            case 'multiple':
                const option = this.optionsContainer.querySelector(`input[value="${previousAnswer.userAnswer}"]`);
                if (option) {
                    option.checked = true;
                    option.closest('.option').classList.add('selected');
                }
                this.showMultipleChoiceFeedback(question, previousAnswer.userAnswer, previousAnswer.isCorrect);
                break;
                
            case 'true-false':
                const tfOption = this.tfContainer.querySelector(`input[value="${previousAnswer.userAnswer}"]`);
                if (tfOption) {
                    tfOption.checked = true;
                    tfOption.closest('.tf-option').classList.add('selected');
                }
                this.showTrueFalseFeedback(question, previousAnswer.userAnswer, previousAnswer.isCorrect);
                break;
                
            case 'fill':
                this.fillAnswer.value = previousAnswer.userAnswer;
                this.showFillBlankFeedback(question, previousAnswer.userAnswer, previousAnswer.isCorrect);
                break;
        }
        
        this.disableAnswerInputs();
    }

    endQuiz() {
        this.isQuizActive = false;
        clearInterval(this.timer);
        
        const endTime = Date.now();
        const timeTaken = Math.floor((endTime - this.startTime) / 1000);
        
        this.displayResults(timeTaken);
        this.showScreen('resultsScreen');
    }

    displayResults(timeTaken) {
        const totalQuestions = this.shuffledQuestions.length;
        const percentage = Math.round((this.score / totalQuestions) * 100);
        
        // Update score display
        this.scoreText.textContent = `${this.score}/${totalQuestions}`;
        this.percentageText.textContent = `${percentage}%`;
        this.correctCount.textContent = this.score;
        this.incorrectCount.textContent = totalQuestions - this.score;
        
        // Format time taken
        const minutes = Math.floor(timeTaken / 60);
        const seconds = timeTaken % 60;
        this.timeTaken.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Generate detailed analysis
        this.generateAnalysis();
    }

    generateAnalysis() {
        this.analysisContainer.innerHTML = '';
        
        this.userAnswers.forEach((answer, index) => {
            const analysisItem = document.createElement('div');
            analysisItem.className = `analysis-item ${answer.isCorrect ? 'correct' : 'incorrect'}`;
            
            let answerText = '';
            let correctAnswerText = '';
            
            switch (answer.type) {
                case 'multiple':
                    answerText = answer.options ? answer.options[answer.userAnswer] : 'No answer';
                    correctAnswerText = answer.options ? answer.options[answer.correctAnswer] : '';
                    break;
                case 'true-false':
                    answerText = answer.userAnswer ? 'True' : 'False';
                    correctAnswerText = answer.correctAnswer ? 'True' : 'False';
                    break;
                case 'fill':
                    answerText = answer.userAnswer || 'No answer';
                    correctAnswerText = Array.isArray(answer.correctAnswer) ? answer.correctAnswer[0] : answer.correctAnswer;
                    break;
            }
            
            analysisItem.innerHTML = `
                <div class="analysis-question">Q${index + 1}: ${answer.question}</div>
                <div class="analysis-answer ${answer.isCorrect ? 'correct' : 'incorrect'}">
                    Your answer: ${answerText}
                </div>
                ${!answer.isCorrect ? `<div class="analysis-answer correct">Correct answer: ${correctAnswerText}</div>` : ''}
            `;
            
            this.analysisContainer.appendChild(analysisItem);
        });
    }

    resetQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.startQuiz();
    }
}

// Initialize the quiz application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});