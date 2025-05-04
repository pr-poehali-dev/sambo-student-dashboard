
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  // Моковые данные для профиля
  const profileData = {
    name: "Алексей Иванов",
    age: 10,
    group: "Группа А",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=250&auto=format&fit=crop",
    coach: "Петров С.М.",
    videos: [
      { 
        id: 1, 
        title: "Задняя подножка", 
        date: "01.05.2025", 
        status: "Проверено",
        thumbnail: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=150&auto=format&fit=crop" 
      },
      { 
        id: 2, 
        title: "Бросок через бедро", 
        date: "28.04.2025", 
        status: "Получен совет",
        thumbnail: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=150&auto=format&fit=crop" 
      },
      { 
        id: 3, 
        title: "Передняя подсечка", 
        date: "20.04.2025", 
        status: "Отправлено",
        thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=150&auto=format&fit=crop" 
      }
    ],
    materials: [
      { id: 1, title: "Диплом соревнований", date: "15.04.2025", type: "diploma" },
      { id: 2, title: "Фото с турнира", date: "10.04.2025", type: "photo" },
      { id: 3, title: "Сертификат участника", date: "01.04.2025", type: "certificate" }
    ],
    achievements: [
      { id: 1, title: "Теория", progress: 70 },
      { id: 2, title: "Практика", progress: 60 },
      { id: 3, title: "Тесты", progress: 80 }
    ]
  };

  // Функция определения цвета статуса
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Проверено": return "green";
      case "Получен совет": return "blue";
      case "Отправлено": return "orange";
      default: return "gray";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Мой профиль</h1>
        <Button variant="outline" size="sm">
          <Icon name="Edit" className="h-4 w-4 mr-2" />
          Редактировать
        </Button>
      </div>

      {/* Основная информация */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="text-center">
              <Avatar className="h-32 w-32 mb-2">
                <AvatarImage src={profileData.avatar} alt={profileData.name} />
                <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="mt-2">
                <Icon name="Upload" className="h-4 w-4 mr-2" />
                Обновить фото
              </Button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{profileData.name}</h2>
                <p className="text-gray-600">{profileData.age} лет, {profileData.group}</p>
                <p className="text-gray-600">Тренер: {profileData.coach}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profileData.achievements.map(achievement => (
                  <Card key={achievement.id} className="bg-gray-50">
                    <CardContent className="p-4">
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-2xl font-bold text-blue-600">{achievement.progress}%</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Вкладки */}
      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="videos">Мои видео</TabsTrigger>
          <TabsTrigger value="materials">Личные материалы</TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Загруженные видео</CardTitle>
                <Button>
                  <Icon name="Plus" className="h-4 w-4 mr-2" />
                  Добавить видео
                </Button>
              </div>
              <CardDescription>
                Загрузи видео с тренировки, чтобы получить советы от тренера
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.videos.map(video => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-32 h-24 bg-gray-200">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{video.title}</h3>
                          <Badge 
                            variant="outline" 
                            className={`bg-${getStatusColor(video.status)}-50 text-${getStatusColor(video.status)}-700 border-${getStatusColor(video.status)}-200`}
                          >
                            {video.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Загружено: {video.date}</p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Eye" className="h-4 w-4 mr-1" />
                            Просмотр
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Icon name="Trash2" className="h-4 w-4 mr-1" />
                            Удалить
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="materials" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Личные материалы</CardTitle>
                <Button>
                  <Icon name="Plus" className="h-4 w-4 mr-2" />
                  Добавить материал
                </Button>
              </div>
              <CardDescription>
                Загрузи дипломы, сертификаты и фото с соревнований
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.materials.map(material => (
                  <Card key={material.id} className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full bg-${
                        material.type === 'diploma' ? 'green' : 
                        material.type === 'certificate' ? 'blue' : 'orange'
                      }-100`}>
                        <Icon 
                          name={
                            material.type === 'diploma' ? 'Award' : 
                            material.type === 'certificate' ? 'FileText' : 'Image'
                          } 
                          className={`h-5 w-5 text-${
                            material.type === 'diploma' ? 'green' : 
                            material.type === 'certificate' ? 'blue' : 'orange'
                          }-600`} 
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{material.title}</p>
                        <p className="text-sm text-gray-500">Загружено: {material.date}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Icon name="Download" className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline">
                  <Icon name="DownloadCloud" className="h-4 w-4 mr-2" />
                  Скачать сертификат прогресса
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
