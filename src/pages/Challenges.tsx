
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

// Типы
interface Challenge {
  id: number;
  title: string;
  description: string;
  category: "mood" | "quiz" | "video";
  reward: Reward;
  difficulty: "easy" | "medium" | "hard";
  isCompleted: boolean;
  progress: number;
  daysLeft?: number;
  image: string;
}

interface Reward {
  id: number;
  type: "badge" | "medal" | "cup";
  title: string;
  image: string;
  isEarned: boolean;
}

const Challenges = () => {
  // Демо-данные для челленджей
  const allChallenges: Challenge[] = [
    // Настроение
    {
      id: 1,
      title: "Неделя настроения",
      description: "Отмечай своё настроение 7 дней подряд",
      category: "mood",
      reward: {
        id: 101,
        type: "badge",
        title: "Знаток эмоций",
        image: "https://images.unsplash.com/photo-1584448141569-69f342da535c?q=80&w=150&auto=format&fit=crop",
        isEarned: false
      },
      difficulty: "easy",
      isCompleted: false,
      progress: 57,
      daysLeft: 3,
      image: "https://images.unsplash.com/photo-1597589022928-bb4002c099ec?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Месяц позитива",
      description: "Отмечай хорошее настроение после каждой тренировки в течение месяца",
      category: "mood",
      reward: {
        id: 102,
        type: "medal",
        title: "Медаль оптимиста",
        image: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?q=80&w=150&auto=format&fit=crop",
        isEarned: false
      },
      difficulty: "medium",
      isCompleted: false,
      progress: 25,
      daysLeft: 22,
      image: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?q=80&w=300&auto=format&fit=crop"
    },
    
    // Кроссворды и задания
    {
      id: 3,
      title: "Знаток правил",
      description: "Разгадай кроссворд о правилах самбо",
      category: "quiz",
      reward: {
        id: 103,
        type: "badge",
        title: "Значок знатока",
        image: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=150&auto=format&fit=crop",
        isEarned: true
      },
      difficulty: "medium",
      isCompleted: true,
      progress: 100,
      image: "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Историческая головоломка",
      description: "Собери пазл с историей развития самбо в России",
      category: "quiz",
      reward: {
        id: 104,
        type: "badge",
        title: "Историк самбо",
        image: "https://images.unsplash.com/photo-1569437061238-aca0cfe86c5a?q=80&w=150&auto=format&fit=crop",
        isEarned: false
      },
      difficulty: "hard",
      isCompleted: false,
      progress: 40,
      image: "https://images.unsplash.com/photo-1541845157-a6d2d100c931?q=80&w=300&auto=format&fit=crop"
    },
    
    // Видео
    {
      id: 5,
      title: "Посмотри и повтори",
      description: "Посмотри все учебные видео в разделе 'Базовые техники'",
      category: "video",
      reward: {
        id: 105,
        type: "cup",
        title: "Кубок юного самбиста",
        image: "https://images.unsplash.com/photo-1586193639347-97f2e471fc17?q=80&w=150&auto=format&fit=crop", 
        isEarned: false
      },
      difficulty: "medium",
      isCompleted: false,
      progress: 75,
      image: "https://images.unsplash.com/photo-1528060621179-11206049a7a3?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Виртуальный наставник",
      description: "Посмотри видеокомментарии тренера к твоим 5 последним загруженным видео",
      category: "video",
      reward: {
        id: 106,
        type: "medal",
        title: "Медаль прилежания",
        image: "https://images.unsplash.com/photo-1607963345402-877ed6a0aa60?q=80&w=150&auto=format&fit=crop",
        isEarned: false
      },
      difficulty: "easy",
      isCompleted: false,
      progress: 60,
      image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=300&auto=format&fit=crop"
    }
  ];

  // Все награды (полученные и доступные)
  const allRewards: Reward[] = [
    {
      id: 101,
      type: "badge",
      title: "Знаток эмоций",
      image: "https://images.unsplash.com/photo-1584448141569-69f342da535c?q=80&w=150&auto=format&fit=crop",
      isEarned: false
    },
    {
      id: 102,
      type: "medal",
      title: "Медаль оптимиста",
      image: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?q=80&w=150&auto=format&fit=crop",
      isEarned: false
    },
    {
      id: 103,
      type: "badge",
      title: "Значок знатока",
      image: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=150&auto=format&fit=crop",
      isEarned: true
    },
    {
      id: 104,
      type: "badge",
      title: "Историк самбо",
      image: "https://images.unsplash.com/photo-1569437061238-aca0cfe86c5a?q=80&w=150&auto=format&fit=crop",
      isEarned: false
    },
    {
      id: 105,
      type: "cup",
      title: "Кубок юного самбиста",
      image: "https://images.unsplash.com/photo-1586193639347-97f2e471fc17?q=80&w=150&auto=format&fit=crop",
      isEarned: false
    },
    {
      id: 106,
      type: "medal",
      title: "Медаль прилежания",
      image: "https://images.unsplash.com/photo-1607963345402-877ed6a0aa60?q=80&w=150&auto=format&fit=crop",
      isEarned: false
    },
    {
      id: 107,
      type: "badge",
      title: "Дисциплина",
      image: "https://images.unsplash.com/photo-1499903240608-abf80aa42764?q=80&w=150&auto=format&fit=crop",
      isEarned: true
    },
    {
      id: 108,
      type: "cup",
      title: "Кубок старания",
      image: "https://images.unsplash.com/photo-1572157510572-6d7541d97f32?q=80&w=150&auto=format&fit=crop",
      isEarned: true
    }
  ];
  
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Фильтрация челленджей
  const getFilteredChallenges = () => {
    if (activeTab === "all") return allChallenges;
    if (activeTab === "completed") return allChallenges.filter(c => c.isCompleted);
    if (activeTab === "available") return allChallenges.filter(c => !c.isCompleted);
    return allChallenges.filter(c => c.category === activeTab);
  };
  
  // Получение наград по типу
  const getRewardsByType = (type: "badge" | "medal" | "cup" | "all"): Reward[] => {
    if (type === "all") return allRewards;
    return allRewards.filter(r => r.type === type);
  };
  
  // Получение цвета для категории челленджа
  const getCategoryColor = (category: Challenge["category"]) => {
    switch (category) {
      case "mood": return "purple";
      case "quiz": return "green";
      case "video": return "orange";
      default: return "gray";
    }
  };
  
  // Получение иконки для категории челленджа
  const getCategoryIcon = (category: Challenge["category"]) => {
    switch (category) {
      case "mood": return "Smile";
      case "quiz": return "BookOpen";
      case "video": return "Video";
      default: return "Award";
    }
  };
  
  // Получение цвета для сложности
  const getDifficultyColor = (difficulty: Challenge["difficulty"]) => {
    switch (difficulty) {
      case "easy": return "text-green-500";
      case "medium": return "text-yellow-500";
      case "hard": return "text-red-500";
      default: return "text-gray-500";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-purple-700">Челленджи и награды</h1>
          <p className="text-slate-600">Выполняй задания и получай награды</p>
        </div>
        
        <div>
          <Badge className="bg-purple-100 text-purple-700 border-purple-200 ml-2">
            <Icon name="Star" className="mr-1 h-3 w-3" />
            {allRewards.filter(r => r.isEarned).length} из {allRewards.length} наград
          </Badge>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="mood">
            <Icon name="Smile" className="mr-1 h-4 w-4" />
            Настроение
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <Icon name="BookOpen" className="mr-1 h-4 w-4" />
            Кроссворды
          </TabsTrigger>
          <TabsTrigger value="video">
            <Icon name="Video" className="mr-1 h-4 w-4" />
            Видео
          </TabsTrigger>
          <TabsTrigger value="completed">
            <Icon name="CheckCircle" className="mr-1 h-4 w-4" />
            Выполненные
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredChallenges().map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
          
          {getFilteredChallenges().length === 0 && (
            <div className="text-center py-10">
              <Icon name="Search" className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">Челленджи не найдены</h3>
              <p className="text-gray-500">Попробуйте выбрать другую категорию</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Раздел с наградами */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-6 text-purple-700">Мои награды</h2>
        
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all">Все награды</TabsTrigger>
            <TabsTrigger value="badges">
              <Icon name="Award" className="mr-1 h-4 w-4" />
              Значки
            </TabsTrigger>
            <TabsTrigger value="medals">
              <Icon name="Medal" className="mr-1 h-4 w-4" />
              Медали
            </TabsTrigger>
            <TabsTrigger value="cups">
              <Icon name="Trophy" className="mr-1 h-4 w-4" />
              Кубки
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <RewardGrid rewards={getRewardsByType("all")} />
          </TabsContent>
          
          <TabsContent value="badges">
            <RewardGrid rewards={getRewardsByType("badge")} />
          </TabsContent>
          
          <TabsContent value="medals">
            <RewardGrid rewards={getRewardsByType("medal")} />
          </TabsContent>
          
          <TabsContent value="cups">
            <RewardGrid rewards={getRewardsByType("cup")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Компонент карточки челленджа
const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const categoryColor = getCategoryColor(challenge.category);
  const categoryIcon = getCategoryIcon(challenge.category);
  const difficultyColor = getDifficultyColor(challenge.difficulty);
  
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${
      challenge.isCompleted ? 'border-2 border-green-500' : ''
    }`}>
      <div className="aspect-video relative">
        <img 
          src={challenge.image} 
          alt={challenge.title} 
          className="w-full h-full object-cover" 
        />
        <div className={`absolute top-2 left-2 bg-${categoryColor}-100 text-${categoryColor}-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
          <Icon name={categoryIcon} className="h-3 w-3" />
          {challenge.category === "mood" ? "Настроение" : 
           challenge.category === "quiz" ? "Кроссворд" : "Видео"}
        </div>
        
        {challenge.daysLeft && (
          <div className="absolute top-2 right-2 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
            {challenge.daysLeft} {challenge.daysLeft === 1 ? 'день' : 
              challenge.daysLeft < 5 ? 'дня' : 'дней'}
          </div>
        )}
        
        {challenge.isCompleted && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-full p-3">
              <Icon name="CheckCircle" className="h-8 w-8 text-green-500" />
            </div>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{challenge.title}</CardTitle>
        <CardDescription>{challenge.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium">Сложность:</span>
          <span className={`text-xs ${difficultyColor} flex items-center`}>
            {challenge.difficulty === "easy" ? (
              <>
                <Icon name="Circle" className="h-3 w-3 mr-1" />
                Легко
              </>
            ) : challenge.difficulty === "medium" ? (
              <>
                <Icon name="CircleAlert" className="h-3 w-3 mr-1" />
                Средне
              </>
            ) : (
              <>
                <Icon name="AlertCircle" className="h-3 w-3 mr-1" />
                Сложно
              </>
            )}
          </span>
        </div>
        
        <div className="space-y-1 mb-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium">Прогресс</span>
            <span className="text-xs text-gray-500">{challenge.progress}%</span>
          </div>
          <Progress value={challenge.progress} className="h-1.5" />
        </div>
        
        <div className="flex items-center gap-2 mt-3">
          <div className="bg-amber-100 rounded-full p-1.5">
            <Icon name={
              challenge.reward.type === "badge" ? "Award" : 
              challenge.reward.type === "medal" ? "Medal" : "Trophy"
            } className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-700">Награда:</p>
            <p className="text-xs text-gray-600">{challenge.reward.title}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button className={`w-full ${
          challenge.isCompleted ? 
          'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-default' : 
          'bg-purple-600 hover:bg-purple-700'
        }`} disabled={challenge.isCompleted}>
          {challenge.isCompleted ? 'Выполнено' : 'Начать выполнение'}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Получение цвета категории челленджа
const getCategoryColor = (category: Challenge["category"]) => {
  switch (category) {
    case "mood": return "purple";
    case "quiz": return "green";
    case "video": return "orange";
    default: return "gray";
  }
};

// Получение иконки категории челленджа
const getCategoryIcon = (category: Challenge["category"]) => {
  switch (category) {
    case "mood": return "Smile";
    case "quiz": return "BookOpen";
    case "video": return "Video";
    default: return "Award";
  }
};

// Компонент сетки наград
const RewardGrid = ({ rewards }: { rewards: Reward[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {rewards.map((reward) => (
        <Card 
          key={reward.id} 
          className={`relative overflow-hidden transition-all hover:shadow-md ${
            reward.isEarned ? '' : 'opacity-50 grayscale'
          }`}
        >
          <div className="p-4 text-center">
            <div className="aspect-square relative mb-3">
              <img 
                src={reward.image} 
                alt={reward.title} 
                className="w-full h-full object-cover rounded-md" 
              />
              {reward.isEarned && (
                <div className="absolute -top-2 -right-2 bg-green-100 rounded-full p-1">
                  <Icon name="CheckCircle" className="h-4 w-4 text-green-600" />
                </div>
              )}
            </div>
            <h3 className="text-sm font-medium">{reward.title}</h3>
            <p className="text-xs text-gray-500 mt-1">
              {reward.type === "badge" ? "Значок" : 
               reward.type === "medal" ? "Медаль" : "Кубок"}
            </p>
          </div>
        </Card>
      ))}
      
      {rewards.length === 0 && (
        <div className="col-span-full text-center py-10">
          <Icon name="Search" className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700">Награды не найдены</h3>
          <p className="text-gray-500">В этой категории пока нет наград</p>
        </div>
      )}
    </div>
  );
};

export default Challenges;
