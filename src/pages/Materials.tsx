
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

// Типы для материалов
interface Material {
  id: number;
  title: string;
  description: string;
  type: "theory" | "technique" | "video";
  progress: number;
  difficulty: "easy" | "medium" | "hard";
  duration: string;
  image: string;
}

const Materials = () => {
  // Демо-данные для учебных материалов
  const allMaterials: Material[] = [
    // Теория
    {
      id: 1,
      title: "История самбо в России",
      description: "Узнай, как появилось самбо и кто его придумал",
      type: "theory",
      progress: 80,
      difficulty: "easy",
      duration: "10 мин",
      image: "https://images.unsplash.com/photo-1608472128070-61a9c977f5e5?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Правила соревнований",
      description: "Основные правила проведения соревнований по самбо",
      type: "theory",
      progress: 45,
      difficulty: "medium",
      duration: "15 мин",
      image: "https://images.unsplash.com/photo-1484656551321-a1161420a2a0?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Разминка перед тренировкой",
      description: "Важность разминки и основные упражнения",
      type: "theory",
      progress: 100,
      difficulty: "easy",
      duration: "8 мин",
      image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=200&auto=format&fit=crop"
    },
    
    // Техника
    {
      id: 4,
      title: "Задняя подножка",
      description: "Основная техника выполнения задней подножки",
      type: "technique",
      progress: 60,
      difficulty: "medium",
      duration: "12 мин",
      image: "https://images.unsplash.com/photo-1600881333268-1261b9559671?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Бросок через бедро",
      description: "Как правильно выполнять бросок через бедро",
      type: "technique",
      progress: 30,
      difficulty: "hard",
      duration: "15 мин",
      image: "https://images.unsplash.com/photo-1515025617920-e6fe72445e37?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Передняя подсечка",
      description: "Выполнение передней подсечки и типичные ошибки",
      type: "technique",
      progress: 0,
      difficulty: "medium",
      duration: "10 мин",
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=200&auto=format&fit=crop"
    },
    
    // Видео
    {
      id: 7,
      title: "Комментарий тренера: захваты",
      description: "Видео от тренера с комментариями по захватам",
      type: "video",
      progress: 75,
      difficulty: "medium",
      duration: "8 мин",
      image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 8,
      title: "Разбор соревнований",
      description: "Видеоразбор прошедших соревнований с тренером",
      type: "video",
      progress: 20,
      difficulty: "hard",
      duration: "20 мин",
      image: "https://images.unsplash.com/photo-1631016844298-a28b89fdab30?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 9,
      title: "Тренировка сборной России",
      description: "Видеозапись тренировки национальной сборной",
      type: "video",
      progress: 0,
      difficulty: "easy",
      duration: "15 мин",
      image: "https://images.unsplash.com/photo-1665788748895-237f667316b7?q=80&w=200&auto=format&fit=crop"
    }
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // Фильтрация материалов по поиску
  const filterMaterials = (materials: Material[], term: string) => {
    if (!term) return materials;
    return materials.filter(material => 
      material.title.toLowerCase().includes(term.toLowerCase()) || 
      material.description.toLowerCase().includes(term.toLowerCase())
    );
  };

  // Получение материалов по типу
  const getMaterialsByType = (type: Material["type"]) => {
    return filterMaterials(allMaterials.filter(material => material.type === type), searchTerm);
  };

  // Получение цвета для типа материала
  const getColorByType = (type: Material["type"]) => {
    switch (type) {
      case "theory": return "blue";
      case "technique": return "green";
      case "video": return "orange";
      default: return "gray";
    }
  };

  // Получение иконки для типа материала
  const getIconByType = (type: Material["type"]) => {
    switch (type) {
      case "theory": return "BookOpen";
      case "technique": return "Activity";
      case "video": return "Video";
      default: return "File";
    }
  };

  // Получение иконки для сложности
  const getDifficultyIcon = (difficulty: Material["difficulty"]) => {
    switch (difficulty) {
      case "easy": return "Circle";
      case "medium": return "CircleAlert";
      case "hard": return "AlertCircle";
      default: return "Circle";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">Учебные материалы</h1>
          <p className="text-slate-600">Изучай самбо с интересными материалами</p>
        </div>
        
        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Поиск материалов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          />
        </div>
      </div>

      <Tabs defaultValue="theory">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="theory" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
            <Icon name="BookOpen" className="mr-2 h-4 w-4" />
            Теория
          </TabsTrigger>
          <TabsTrigger value="technique" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
            <Icon name="Activity" className="mr-2 h-4 w-4" />
            Техника
          </TabsTrigger>
          <TabsTrigger value="video" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700">
            <Icon name="Video" className="mr-2 h-4 w-4" />
            Видео
          </TabsTrigger>
        </TabsList>

        {/* Теория */}
        <TabsContent value="theory" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getMaterialsByType("theory").map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
          
          {getMaterialsByType("theory").length === 0 && (
            <div className="text-center py-10">
              <Icon name="Search" className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">Материалы не найдены</h3>
              <p className="text-gray-500">Попробуйте изменить запрос поиска</p>
            </div>
          )}
        </TabsContent>

        {/* Техника */}
        <TabsContent value="technique" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getMaterialsByType("technique").map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
          
          {getMaterialsByType("technique").length === 0 && (
            <div className="text-center py-10">
              <Icon name="Search" className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">Материалы не найдены</h3>
              <p className="text-gray-500">Попробуйте изменить запрос поиска</p>
            </div>
          )}
        </TabsContent>

        {/* Видео */}
        <TabsContent value="video" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getMaterialsByType("video").map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
          
          {getMaterialsByType("video").length === 0 && (
            <div className="text-center py-10">
              <Icon name="Search" className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">Материалы не найдены</h3>
              <p className="text-gray-500">Попробуйте изменить запрос поиска</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Компонент карточки материала
const MaterialCard = ({ material }: { material: Material }) => {
  const color = 
    material.type === "theory" ? "blue" : 
    material.type === "technique" ? "green" : "orange";
  
  const icon = 
    material.type === "theory" ? "BookOpen" : 
    material.type === "technique" ? "Activity" : "Video";
  
  const difficultyIcon = 
    material.difficulty === "easy" ? "Circle" : 
    material.difficulty === "medium" ? "CircleAlert" : "AlertCircle";
  
  const difficultyText = 
    material.difficulty === "easy" ? "Легко" : 
    material.difficulty === "medium" ? "Средне" : "Сложно";
  
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md border-t-4 border-t-${color}-500`}>
      <div className="aspect-video relative">
        <img 
          src={material.image} 
          alt={material.title} 
          className="w-full h-full object-cover" 
        />
        <div className={`absolute top-2 right-2 bg-${color}-100 text-${color}-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
          <Icon name={icon} className="h-3 w-3" />
          {material.type === "theory" ? "Теория" : material.type === "technique" ? "Техника" : "Видео"}
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{material.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-gray-600 text-sm mb-3">{material.description}</p>
        
        <div className="flex items-center justify-between mb-1 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Icon name="Clock" className="h-3 w-3" />
            {material.duration}
          </span>
          <span className="flex items-center gap-1">
            <Icon name={difficultyIcon} className={`h-3 w-3 ${
              material.difficulty === "easy" ? "text-green-500" : 
              material.difficulty === "medium" ? "text-yellow-500" : "text-red-500"
            }`} />
            {difficultyText}
          </span>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium">Прогресс</span>
            <span className="text-xs text-gray-500">{material.progress}%</span>
          </div>
          <Progress value={material.progress} className="h-1.5" />
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button className={`w-full bg-${color}-500 hover:bg-${color}-600`}>
          {material.progress > 0 ? "Продолжить" : "Начать обучение"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Materials;
