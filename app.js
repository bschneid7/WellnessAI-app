// Wellness App JavaScript
class WellnessApp {
    constructor() {
        this.currentUser = {
            name: 'Sarah',
            streak: 0,
            weeklyGoals: 0,
            wellnessScore: 75,
            goals: [],
            checkIns: [],
            chatHistory: []
        };
        
        this.wellnessCategories = {
            fitness: { name: "Fitness & Movement", color: "#FF6B6B", icon: "🏃‍♂️" },
            nutrition: { name: "Nutrition & Diet", color: "#4ECDC4", icon: "🥗" },
            sleep: { name: "Sleep & Recovery", color: "#45B7D1", icon: "😴" },
            mental: { name: "Mental Health", color: "#96CEB4", icon: "🧠" },
            stress: { name: "Stress Management", color: "#FFEAA7", icon: "🧘‍♀️" }
        };
        
        this.sampleRecommendations = {
            fitness: [
                "Start with 10-minute morning walks to build consistency",
                "Try bodyweight exercises 3x per week (push-ups, squats, planks)",
                "Set a daily step goal of 7,000 steps and gradually increase",
                "Schedule workout sessions in your calendar like important meetings"
            ],
            nutrition: [
                "Drink a glass of water before each meal to improve hydration",
                "Add one serving of vegetables to every lunch and dinner",
                "Prepare healthy snacks in advance (nuts, fruits, yogurt)",
                "Practice mindful eating - chew slowly and avoid distractions"
            ],
            sleep: [
                "Establish a consistent bedtime routine starting 1 hour before sleep",
                "Keep your bedroom cool (65-68°F) and dark for optimal sleep",
                "Avoid screens 30 minutes before bedtime",
                "Try progressive muscle relaxation or deep breathing exercises"
            ],
            mental: [
                "Practice 5 minutes of daily gratitude journaling",
                "Connect with a friend or family member once per day",
                "Engage in a hobby or creative activity for 20 minutes",
                "Practice positive self-talk and challenge negative thoughts"
            ],
            stress: [
                "Use the 4-7-8 breathing technique when feeling overwhelmed",
                "Take regular breaks during work (5 minutes every hour)",
                "Practice saying 'no' to non-essential commitments",
                "Create a calming environment with plants or soothing music"
            ]
        };

        this.coachResponses = {
            "I'm feeling stressed": [
                "I understand stress can be overwhelming. Let's try the 4-7-8 breathing technique: Breathe in for 4 counts, hold for 7, exhale for 8. This activates your parasympathetic nervous system and helps you relax. 🌸",
                "What specific situation is causing you stress right now? Sometimes breaking it down into smaller, manageable parts can help reduce the overwhelming feeling."
            ],
            "Help me with meal planning": [
                "Great choice focusing on nutrition! Here's a simple approach: Plan for 3 balanced meals and 2 healthy snacks daily. Include a protein, complex carb, and vegetables in each meal. 🥗",
                "Start with meal prep on Sundays. Cook proteins in bulk, wash and chop vegetables, and portion out healthy snacks. This saves time and reduces decision fatigue during the week."
            ],
            "I need motivation": [
                "Remember why you started this wellness journey! Small, consistent actions create lasting change. You don't have to be perfect - you just need to keep going. 💪",
                "Let's use the 'habit stacking' technique. Link a new healthy habit to something you already do daily. For example: 'After I brush my teeth, I will do 10 squats.'"
            ],
            "How do I build better habits?": [
                "Building habits is about consistency, not perfection! Start with the '2-minute rule' - make your new habit so easy it takes less than 2 minutes to complete. 🎯",
                "Focus on identity-based habits. Instead of 'I want to exercise,' think 'I am someone who moves their body daily.' This shift in mindset makes habits stick better."
            ]
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDashboard();
        this.setupCharts();
        this.generateSampleData();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Check-in form elements
        this.setupCheckInListeners();
        
        // Goals form
        this.setupGoalsListeners();
        
        // Chat functionality
        this.setupChatListeners();
        
        // Profile updates
        this.setupProfileListeners();
    }

    setupCheckInListeners() {
        // Mood selector
        document.querySelectorAll('.mood-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.mood-option').forEach(o => o.classList.remove('selected'));
                e.target.classList.add('selected');
            });
        });

        // Energy slider
        const energySlider = document.getElementById('energy-level');
        const energyValue = document.getElementById('energy-value');
        energySlider.addEventListener('input', (e) => {
            energyValue.textContent = e.target.value;
        });

        // Sleep rating
        document.querySelectorAll('#sleep-rating span').forEach(star => {
            star.addEventListener('click', (e) => {
                const rating = parseInt(e.target.dataset.rating);
                document.querySelectorAll('#sleep-rating span').forEach((s, index) => {
                    s.classList.toggle('active', index < rating);
                });
            });
        });

        // Stress selector
        document.querySelectorAll('.stress-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.stress-option').forEach(o => o.classList.remove('selected'));
                e.target.classList.add('selected');
            });
        });
    }

    setupGoalsListeners() {
        const goalForm = document.getElementById('goal-form');
        goalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.createGoal();
        });
    }

    setupChatListeners() {
        const chatInput = document.getElementById('chat-input');
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendChatMessage();
            }
        });
    }

    setupProfileListeners() {
        // Profile update functionality would go here
    }

    switchTab(tabName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        // Load specific tab content
        switch(tabName) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'goals':
                this.loadGoals();
                break;
            case 'progress':
                this.loadProgress();
                break;
        }
    }

    loadDashboard() {
        // Update user name
        document.getElementById('user-name').textContent = this.currentUser.name;
        
        // Update stats
        document.getElementById('current-streak').textContent = this.currentUser.streak;
        document.getElementById('weekly-goals').textContent = this.currentUser.weeklyGoals;
        document.getElementById('wellness-score').textContent = this.currentUser.wellnessScore;

        // Load recommendations
        this.loadRecommendations();
    }

    loadRecommendations() {
        const grid = document.getElementById('recommendations-grid');
        grid.innerHTML = '';

        // Get random recommendations from different categories
        const categories = Object.keys(this.sampleRecommendations);
        const selectedRecommendations = [];

        for (let i = 0; i < 4; i++) {
            const category = categories[i % categories.length];
            const recommendations = this.sampleRecommendations[category];
            const randomRec = recommendations[Math.floor(Math.random() * recommendations.length)];
            selectedRecommendations.push({
                category: category,
                text: randomRec,
                icon: this.wellnessCategories[category].icon
            });
        }

        selectedRecommendations.forEach(rec => {
            const card = document.createElement('div');
            card.className = 'recommendation-card fade-in';
            card.innerHTML = `
                <h4>${rec.icon} ${this.wellnessCategories[rec.category].name}</h4>
                <p>${rec.text}</p>
            `;
            grid.appendChild(card);
        });
    }

    submitCheckin() {
        const mood = document.querySelector('.mood-option.selected')?.dataset.mood;
        const energy = document.getElementById('energy-level').value;
        const sleep = document.querySelectorAll('#sleep-rating span.active').length;
        const stress = document.querySelector('.stress-option.selected')?.dataset.stress;
        const habits = Array.from(document.querySelectorAll('input[name="habit"]:checked')).map(cb => cb.value);
        const notes = document.getElementById('daily-notes').value;

        if (!mood || !stress) {
            alert('Please complete all required fields');
            return;
        }

        const checkIn = {
            date: new Date().toISOString().split('T')[0],
            mood: parseInt(mood),
            energy: parseInt(energy),
            sleep: sleep,
            stress: stress,
            habits: habits,
            notes: notes
        };

        this.currentUser.checkIns.push(checkIn);
        
        // Update wellness score based on check-in
        this.updateWellnessScore(checkIn);
        
        // Update streak
        this.updateStreak();

        // Show success message
        this.showSuccessMessage('Check-in completed! 🎉');
        
        // Reset form
        this.resetCheckInForm();
        
        // Switch to dashboard
        this.switchTab('dashboard');
    }

    updateWellnessScore(checkIn) {
        let score = 0;
        
        // Mood contributes 30%
        score += (checkIn.mood / 10) * 30;
        
        // Energy contributes 25%
        score += (checkIn.energy / 10) * 25;
        
        // Sleep contributes 25%
        score += (checkIn.sleep / 5) * 25;
        
        // Stress contributes 10% (inverted - low stress is good)
        const stressScore = checkIn.stress === 'low' ? 10 : checkIn.stress === 'medium' ? 5 : 0;
        score += stressScore;
        
        // Habits contribute 10%
        score += (checkIn.habits.length / 4) * 10;
        
        this.currentUser.wellnessScore = Math.round(score);
    }

    updateStreak() {
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        
        const todayCheckIn = this.currentUser.checkIns.find(c => c.date === today);
        const yesterdayCheckIn = this.currentUser.checkIns.find(c => c.date === yesterday);
        
        if (todayCheckIn) {
            if (yesterdayCheckIn || this.currentUser.streak === 0) {
                this.currentUser.streak++;
            } else {
                this.currentUser.streak = 1;
            }
        }
    }

    resetCheckInForm() {
        document.querySelectorAll('.mood-option').forEach(o => o.classList.remove('selected'));
        document.getElementById('energy-level').value = 5;
        document.getElementById('energy-value').textContent = '5';
        document.querySelectorAll('#sleep-rating span').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.stress-option').forEach(o => o.classList.remove('selected'));
        document.querySelectorAll('input[name="habit"]').forEach(cb => cb.checked = false);
        document.getElementById('daily-notes').value = '';
    }

    showGoalForm() {
        document.getElementById('goal-modal').classList.add('show');
    }

    hideGoalForm() {
        document.getElementById('goal-modal').classList.remove('show');
        document.getElementById('goal-form').reset();
    }

    createGoal() {
        const title = document.getElementById('goal-title').value;
        const category = document.getElementById('goal-category').value;
        const date = document.getElementById('goal-date').value;
        const description = document.getElementById('goal-description').value;

        const goal = {
            id: Date.now(),
            title: title,
            category: category,
            targetDate: date,
            description: description,
            progress: 0,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.currentUser.goals.push(goal);
        this.hideGoalForm();
        this.loadGoals();
        this.showSuccessMessage('Goal created successfully! 🎯');
    }

    loadGoals() {
        const grid = document.getElementById('goals-grid');
        grid.innerHTML = '';

        if (this.currentUser.goals.length === 0) {
            grid.innerHTML = `
                <div class="card">
                    <div class="card__body">
                        <h3>No goals yet</h3>
                        <p>Create your first wellness goal to get started!</p>
                        <button class="btn btn--primary" onclick="app.showGoalForm()">+ Add Goal</button>
                    </div>
                </div>
            `;
            return;
        }

        this.currentUser.goals.forEach(goal => {
            const categoryInfo = this.wellnessCategories[goal.category];
            const card = document.createElement('div');
            card.className = 'goal-card fade-in';
            card.innerHTML = `
                <div class="goal-header">
                    <h3>${goal.title}</h3>
                    <span class="goal-category">${categoryInfo.icon} ${categoryInfo.name}</span>
                </div>
                <p>${goal.description}</p>
                <p><strong>Target Date:</strong> ${new Date(goal.targetDate).toLocaleDateString()}</p>
                <div class="goal-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${goal.progress}%"></div>
                    </div>
                    <div class="progress-text">${goal.progress}% Complete</div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    sendMessage(message) {
        this.addMessageToChat(message, 'user');
        
        // Generate AI response
        setTimeout(() => {
            const response = this.generateCoachResponse(message);
            this.addMessageToChat(response, 'coach');
        }, 1000);
    }

    sendChatMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message) {
            this.sendMessage(message);
            input.value = '';
        }
    }

    addMessageToChat(message, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateCoachResponse(userMessage) {
        // Check for predefined responses
        for (const [trigger, responses] of Object.entries(this.coachResponses)) {
            if (userMessage.toLowerCase().includes(trigger.toLowerCase())) {
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }

        // General encouraging responses
        const generalResponses = [
            "That's a great question! Remember, small consistent steps lead to big changes. What specific area would you like to focus on today? 🌟",
            "I'm here to support you! Building healthy habits takes time and patience. Let's break this down into manageable steps. 💪",
            "Every wellness journey is unique. What matters most is that you're taking action. How can I help you move forward today? 🚀",
            "I love your commitment to your wellness! Let's use the SMART goal framework to make this more achievable. Can you be more specific about what you'd like to accomplish? 🎯"
        ];

        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }

    setupCharts() {
        // Wellness Score Chart
        const wellnessCtx = document.getElementById('wellness-chart');
        if (wellnessCtx) {
            new Chart(wellnessCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Wellness Score',
                        data: [65, 70, 75, 72, 78, 75, 80],
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }

        // Category Chart
        const categoryCtx = document.getElementById('category-chart');
        if (categoryCtx) {
            new Chart(categoryCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Fitness', 'Nutrition', 'Sleep', 'Mental Health', 'Stress Management'],
                    datasets: [{
                        data: [85, 70, 90, 75, 80],
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    loadProgress() {
        // Load insights
        const insights = [
            {
                title: "Great Sleep Consistency! 😴",
                content: "You've maintained 7+ hours of sleep for 5 consecutive days. This consistency is boosting your overall wellness score."
            },
            {
                title: "Fitness Momentum Building 💪",
                content: "Your exercise frequency has increased by 40% this week. Consider adding variety to prevent plateaus."
            },
            {
                title: "Stress Management Opportunity 🧘‍♀️",
                content: "Your stress levels peak on Wednesdays. Try scheduling a midweek mindfulness session to maintain balance."
            }
        ];

        const insightsGrid = document.getElementById('insights-grid');
        insightsGrid.innerHTML = '';

        insights.forEach(insight => {
            const card = document.createElement('div');
            card.className = 'insight-card fade-in';
            card.innerHTML = `
                <h4>${insight.title}</h4>
                <p>${insight.content}</p>
            `;
            insightsGrid.appendChild(card);
        });
    }

    generateSampleData() {
        // Add some sample goals
        this.currentUser.goals = [
            {
                id: 1,
                title: "Walk 10,000 steps daily",
                category: "fitness",
                targetDate: "2025-07-25",
                description: "Build a consistent walking habit",
                progress: 65,
                completed: false,
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                title: "Drink 8 glasses of water daily",
                category: "nutrition", 
                targetDate: "2025-07-15",
                description: "Improve hydration habits",
                progress: 80,
                completed: false,
                createdAt: new Date().toISOString()
            }
        ];

        // Update stats
        this.currentUser.streak = 3;
        this.currentUser.weeklyGoals = 2;
    }

    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-animation';
        successDiv.textContent = message;
        document.body.appendChild(successDiv);

        // Create confetti effect
        this.createConfetti();

        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'][Math.floor(Math.random() * 4)];
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 3000);
        }
    }

    updateProfile() {
        const name = document.getElementById('profile-name').value;
        const goals = document.getElementById('profile-goals').value;

        this.currentUser.name = name;
        this.currentUser.profileGoals = goals;

        this.loadDashboard();
        this.showSuccessMessage('Profile updated successfully! ✨');
    }
}

// Global functions for HTML onclick handlers
function switchTab(tabName) {
    app.switchTab(tabName);
}

function submitCheckin() {
    app.submitCheckin();
}

function showGoalForm() {
    app.showGoalForm();
}

function hideGoalForm() {
    app.hideGoalForm();
}

function sendMessage(message) {
    app.sendMessage(message);
}

function sendChatMessage() {
    app.sendChatMessage();
}

function updateProfile() {
    app.updateProfile();
}

// Initialize the app
const app = new WellnessApp();

// Add click outside modal to close
document.addEventListener('click', (e) => {
    const modal = document.getElementById('goal-modal');
    if (e.target === modal) {
        app.hideGoalForm();
    }
});