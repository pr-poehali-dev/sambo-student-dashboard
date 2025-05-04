
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

// Типы для профиля
interface UserVideo {
  id: number;
  title: string;
  uploadDate: string;
  status: "sent" | "reviewed" | "feedback";
  thumbnail: string;
}

interface UserAchievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
}

interface UserDocument {
  id: number;
  title: string;
  type: "diploma" | "certificate" | "photo";
  date: string;
  url: string;
}

const Profile = () => {
  // Демо-данные профиля
  const userData = {
    name: "Алексей",
    age: 10,
    group: "Группа А",
    joinDate: "Сентябрь 2024",
    level: "Начинающий",
    coach: "Иванов А.П.",
    progress: {
      theory: 65,
      technique: 40,
      videos: 80,
      total: 62
    }
  };
  
  // Демо-данные видео пользователя
  const userVideos: UserVideo[] = [
    {
      id: 1,
      title: "Тренировка броска через бедро",
      uploadDate: "2 мая 2025",
      status: "feedback",
      thumbnail: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Задняя подножка на тренировке",
      uploadDate: "25 апреля 2025",
      status: "reviewed",
      thumbnail: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Выполнение болевого приёма",
      uploadDate: "18 апреля 2025",
      status: "sent",
      thumbnail: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=300&auto=format&fit=crop"
    }
  ];
  
  // Демо-данные достижений
  const userAchievements: UserAchievement[] = [
    {
      id: 1,
      title: "Знаток теории",
      description: "Завершено 80% теоретических материалов",
      icon: "BookOpen",
      earnedDate: "28 апреля 2025"
    },
    {
      id: 2,
      title: "Первый успех",
      description: "Загружено первое видео тренировки",
      icon: "Video",
      earnedDate: "15 апреля 2025"
    },
    {
      id: 3,
      title: "Регулярные тренировки",
      description: "7 дней подряд отмечено настроение",
      icon: "Calendar",
      earnedDate: "10 апреля 2025"
    }
  ];
  
  // Демо-данные документов
  const userDocuments: UserDocument[] = [
    {
      id: 1,
      title: "Диплом городского турнира",
      type: "diploma",
      date: "12 марта 2025",
      url: "https://images.unsplash.com/photo-1570533679438-d6d122e3505f?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Сертификат 1 юношеского разряда",
      type: "certificate",
      date: "5 февраля 2025",
      url: "https://images.unsplash.com/photo-1613280199977-c0f1ee5cfa2e?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Фото с мастер-класса",
      type: "photo",
      date: "20 января 2025",
      url: "https://images.unsplash.com/photo-1511267919940-865f383a6e1f?q=80&w=300&auto=format&fit=crop"
    }
  ];
  
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  
  // Предустановленные аватары
  const avatarOptions = [
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
  ];
  
  // Получение цвета для статуса видео
  const getStatusColor = (status: UserVideo["status"]) => {
    switch (status) {
      case "sent": return "blue";
      case "reviewed": return "orange";
      case "feedback": return "green";
      default: return "gray";
    }
  };
  
  // Получение текста для статуса видео
  const getStatusText = (status: UserVideo["status"]) => {
    switch (status) {
      case "sent": return "Отправлено";
      case "reviewed": return "Просмотрено";
      case "feedback": return "Есть ответ";
      default: return "Неизвестно";
    }
  };
  
  // Получение иконки для статуса видео
  const getStatusIcon = (status: UserVideo["status"]) => {
    switch (status) {
      case "sent": return "Send";
      case "reviewed": return "Eye";
      case "feedback": return "MessageSquare";
      default: return "HelpCircle";
    }
  };
  
  // Получение иконки для типа документа
  const getDocumentIcon = (type: UserDocument["type"]) => {
    switch (type) {
      case "diploma": return "Award";
      case "certificate": return "FileText";
      case "photo": return "Image";
      default: return "File";
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-blue-700">Мой профиль</h1>
        <p className="text-slate-600">Управление личной информацией и документами</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Левая колонка - Личная информация */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="text-center pb-2">
              <CardTitle>Личная информация</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative group">
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage src={selectedAvatar || avatarOptions[0]} alt={userData.name} />
                  <AvatarFallback>{userData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0">
                  <Button variant="outline" size="icon" className="rounded-full h-8 w-8 bg-white">
                    <Icon name="PenSquare" className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <h2 className="text-xl font-bold mt-2">{userData.name}</h2>
              <div className="text-sm text-gray-500 mb-4">{userData.age} лет, {userData.group}</div>
              
              <div className="w-full space-y-4">
                <div className="flex items-center gap-2">
                  <Icon name="User" className="text-blue-600 h-5 w-5" />
                  <div>
                    <div className="text-sm font-medium">Уровень</div>
                    <div className="text-sm text-gray-600">{userData.level}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Icon name="UserCheck" className="text-blue-600 h-5 w-5" />
                  <div>
                    <div className="text-sm font-medium">Тренер</div>
                    <div className="text-sm text-gray-600">{userData.coach}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" className="text-blue-600 h-5 w-5" />
                  <div>
                    <div className="text-sm font-medium">Дата начала</div>
                    <div className="text-sm text-gray-600">{userData.joinDate}</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Редактировать профиль</Button>
            </CardFooter>
          </Card>
          
          {/* Блок с аватарами */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Выбрать аватар</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {avatarOptions.map((avatar, index) => (
                  <button
                    key={index}
                    className={`rounded-full overflow-hidden border-2 ${
                      selectedAvatar === avatar ? 'border-blue-500' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedAvatar(avatar)}
                  >
                    <img src={avatar} alt={`Аватар ${index+1}`} className="h-12 w-12 object-cover" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Прогресс обучения */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Прогресс обучения</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center mb-4">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full border-4 border-blue-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-700">{userData.progress.total}%</span>
                  </div>
                  <div className="absolute top-0 left-0 right-0 bottom-0">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" className="rotate-[-90deg]">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#dbeafe" strokeWidth="8" />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="8" 
                        strokeDasharray={`${2 * Math.PI * 40 * userData.progress.total / 100} ${2 * Math.PI * 40 * (1 - userData.progress.total / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">Общий прогресс</div>
              </div>
              
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Теория</span>
                    <span>{userData.progress.theory}%</span>
                  </div>
                  <Progress value={userData.progress.theory} className="h-1.5" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Техника</span>
                    <span>{userData.progress.technique}%</span>
                  </div>
                  <Progress value={userData.progress.technique} className="h-1.5" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Видеоуроки</span>
                    <span>{userData.progress.videos}%</span>
                  </div>
                  <Progress value={userData.progress.videos} className="h-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Правая колонка - Видео, достижения и документы */}
        <div className="md:col-span-2">
          <Tabs defaultValue="videos">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="videos">
                <Icon name="Video" className="mr-2 h-4 w-4" />
                Мои видео
              </TabsTrigger>
              <TabsTrigger value="achievements">
                <Icon name="Award" className="mr-2 h-4 w-4" />
                Достижения
              </TabsTrigger>
              <TabsTrigger value="documents">
                <Icon name="FileText" className="mr-2 h-4 w-4" />
                Документы
              </TabsTrigger>
            </TabsList>
            
            {/* Вкладка с видео */}
            <TabsContent value="videos">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Загруженные видео</CardTitle>
                    <Button>
                      <Icon name="PlusCircle" className="mr-2 h-4 w-4" />
                      Добавить видео
                    </Button>
                  </div>
                  <CardDescription>Загрузи видео своей тренировки для проверки тренером</CardDescription>
                </CardHeader>
                <CardContent>
                  {userVideos.length > 0 ? (
                    <div className="space-y-4">
                      {userVideos.map((video) => (
                        <div key={video.id} className="flex gap-4 items-center bg-white p-3 rounded-lg hover:shadow-md transition-shadow border">
                          <div className="relative w-24 h-16 overflow-hidden rounded">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title} 
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                              <Icon name="Play" className="text-white h-8 w-8" />
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-blue-700 truncate">{video.title}</h3>
                            <div className="flex items-center mt-1">
                              <Icon name="Calendar" className="text-gray-400 h-3 w-3 mr-1" />
                              <span className="text-xs text-gray-500">{video.uploadDate}</span>
                            </div>
                          </div>
                          
                          <Badge className={`bg-${getStatusColor(video.status)}-100 text-${getStatusColor(video.status)}-700 flex items-center gap-1`}>
                            <Icon name={getStatusIcon(video.status)} className="h-3 w-3" />
                            {getStatusText(video.status)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Icon name="Video" className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                      <h3 className="text-lg font-medium text-gray-700">Нет загруженных видео</h3>
                      <p className="text-gray-500 mb-4">Загрузи свою первую тренировку для отзыва тренера</p>
                      <Button>
                        <Icon name="PlusCircle" className="mr-2 h-4 w-4" />
                        Добавить видео
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Вкладка с достижениями */}
            <TabsContent value="achievements">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Мои достижения</CardTitle>
                  <CardDescription>Твои награды и достижения за успехи в обучении</CardDescription>
                </CardHeader>
                <CardContent>
                  {userAchievements.length > 0 ? (
                    <div className="space-y-4">
                      {userAchievements.map((achievement) => (
                        <div key={achievement.id} className="flex gap-4 items-center bg-white p-3 rounded-lg hover:shadow-md transition-shadow border">
                          <div className="p-3 bg-blue-100 rounded-full">
                            <Icon name={achievement.icon} className="text-blue-600 h-6 w-6" />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-medium text-blue-700">{achievement.title}</h3>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                            <div className="flex items-center mt-1">
                              <Icon name="Calendar" className="text-gray-400 h-3 w-3 mr-1" />
                              <span className="text-xs text-gray-500">Получено: {achievement.earnedDate}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Icon name="Award" className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                      <h3 className="text-lg font-medium text-gray-700">Нет достижений</h3>
                      <p className="text-gray-500">Выполняй задания и получай награды</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Вкладка с документами */}
            <TabsContent value="documents">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Личные документы</CardTitle>
                    <Button>
                      <Icon name="Upload" className="mr-2 h-4 w-4" />
                      Загрузить
                    </Button>
                  </div>
                  <CardDescription>Дипломы, сертификаты и фотографии с соревнований</CardDescription>
                </CardHeader>
                <CardContent>
                  {userDocuments.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {userDocuments.map((document) => (
                        <div key={document.id} className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                          <div className="aspect-video relative">
                            <img 
                              src={document.url} 
                              alt={document.title} 
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute top-2 right-2 bg-white p-1 rounded-full">
                              <Icon name={getDocumentIcon(document.type)} className="h-4 w-4 text-blue-600" />
                            </div>
                          </div>
                          
                          <div className="p-3">
                            <h3 className="font-medium text-blue-700 text-sm">{document.title}</h3>
                            <div className="flex items-center mt-1">
                              <Icon name="Calendar" className="text-gray-400 h-3 w-3 mr-1" />
                              <span className="text-xs text-gray-500">{document.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Icon name="FileText" className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                      <h3 className="text-lg font-medium text-gray-700">Нет загруженных документов</h3>
                      <p className="text-gray-500 mb-4">Загрузите свои дипломы и сертификаты</p>
                      <Button>
                        <Icon name="Upload" className="mr-2 h-4 w-4" />
                        Загрузить документ
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
