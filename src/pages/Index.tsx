
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Index = () => {
  const [mood, setMood] = useState<string | null>(null);
  
  // Временные данные для демонстрации
  const studentName = "Гость";
  const upcomingTrainings = [
    { id: 1, day: "Понедельник", date: "6 мая", time: "16:00-17:30", coach: "Иванов А.П." },
    { id: 2, day: "Среда", date: "8 мая", time: "16:00-17:30", coach: "Иванов А.П." },
    { id: 3, day: "Пятница", date: "10 мая", time: "16:00-17:30", coach: "Иванов А.П." },
  ];
  
  const achievements = [
    { id: 1, title: "Основы самбо", progress: 60 },
    { id: 2, title: "Техника бросков", progress: 40 },
    { id: 3, title: "Выполнено тестов", progress: 75 },
  ];
  
  const quickActions = [
    { id: 1, title: "Учебные материалы", icon: "BookOpen", link: "/materials" },
    { id: 2, title: "Видеозадания", icon: "Video", link: "/video-tasks" },
    { id: 3, title: "Чат с тренером", icon: "MessageSquare", link: "/chat" },
  ];
  
  const handleMoodSelect = (selectedMood: string) => {
    setMood(selectedMood);
  };
  
  const handleSaveMood = () => {
    // Здесь будет логика сохранения настроения
    alert(`Настроение "${mood}" сохранено!`);
  };

  return (
    <div className="space-y-6">
      {/* Приветствие */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Привет, {studentName}!</h1>
        <p className="text-slate-600">Рады видеть тебя снова!</p>
      </div>
      
      {/* Быстрые действия */}
      <div>
        <h2 className="text-xl font-semibold mb-3 text-blue-800">Быстрые действия</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link to={action.link} key={action.id}>
              <Card className="hover:bg-blue-50 transition-colors cursor-pointer h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Icon name={action.icon} className="text-blue-600" />
                    {action.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Настроение сегодня */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Настроение сегодня</CardTitle>
          <CardDescription>Выбери эмодзи, которое описывает твоё настроение</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-4 text-3xl">
            {["😀", "🙂", "😐", "🙁", "😢"].map((emoji, index) => (
              <button 
                key={index}
                onClick={() => handleMoodSelect(emoji)}
                className={`p-2 rounded-full ${mood === emoji ? 'bg-blue-100 ring-2 ring-blue-400' : 'hover:bg-gray-100'}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleSaveMood} 
            disabled={!mood}
            variant="default"
          >
            Сохранить
          </Button>
        </CardFooter>
      </Card>
      
      {/* Расписание тренировок */}
      <div>
        <h2 className="text-xl font-semibold mb-3 text-blue-800">Расписание ближайших тренировок</h2>
        <div className="space-y-3">
          {upcomingTrainings.map((training) => (
            <Card key={training.id} className="bg-white">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{training.day}, {training.date}</h3>
                    <p className="text-gray-600">{training.time}</p>
                    <p className="text-sm text-gray-500">Тренер: {training.coach}</p>
                  </div>
                  <Icon name="Calendar" className="text-blue-600 h-8 w-8" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Прогресс */}
      <div>
        <h2 className="text-xl font-semibold mb-3 text-blue-800">Твой прогресс</h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{achievement.title}</span>
                  <span className="text-sm text-gray-500">{achievement.progress}%</span>
                </div>
                <Progress value={achievement.progress} className="h-2" />
              </div>
            ))}
            <Link to="/progress">
              <Button className="w-full mt-2" variant="outline">
                Подробнее о прогрессе
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
