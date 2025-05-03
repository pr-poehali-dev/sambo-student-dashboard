
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Message {
  id: number;
  content: string;
  sender: "user" | "coach";
  timestamp: string;
  hasVideo?: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Привет, Алексей! Как твои тренировки? Есть ли вопросы по технике?",
      sender: "coach",
      timestamp: "10:00"
    },
    {
      id: 2,
      content: "Здравствуйте! Я тренировался делать заднюю подножку, но у меня не всегда получается. Можно видео того, как я делаю?",
      sender: "user",
      timestamp: "10:05",
    },
    {
      id: 3,
      content: "Конечно, присылай видео! Я посмотрю и дам советы по улучшению техники.",
      sender: "coach",
      timestamp: "10:07"
    },
    {
      id: 4,
      content: "Вот моё видео с тренировки",
      sender: "user",
      timestamp: "10:15",
      hasVideo: true
    },
    {
      id: 5,
      content: "Отличная попытка! Обрати внимание на положение ног - они должны быть чуть шире. И когда делаешь подножку, старайся быть ближе к партнёру. Завтра на тренировке я тебе покажу ещё раз.",
      sender: "coach",
      timestamp: "10:30"
    },
  ]);

  const [newMessage, setNewMessage] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Шаблоны быстрых ответов
  const quickResponses = [
    "Когда следующая тренировка?",
    "Что нужно взять с собой на тренировку?",
    "Как правильно делать бросок через бедро?",
  ];

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg: Message = {
      id: messages.length + 1,
      content: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    // Имитация ответа тренера через 1 секунду
    setTimeout(() => {
      const coachResponse: Message = {
        id: messages.length + 2,
        content: "Спасибо за сообщение! Я скоро отвечу тебе.",
        sender: "coach",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prevMessages => [...prevMessages, coachResponse]);
    }, 1000);
  };

  const handleUploadVideo = () => {
    setIsUploading(true);
    // Имитация загрузки видео
    setTimeout(() => {
      setIsUploading(false);
      const videoMessage: Message = {
        id: messages.length + 1,
        content: "Я загрузил новое видео с моей тренировки",
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasVideo: true
      };
      setMessages([...messages, videoMessage]);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-10rem)]">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Чат с тренером</h1>
          <p className="text-slate-600">Задавай вопросы и делись видео с тренировок</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Icon name="Video" className="h-4 w-4" />
              Добавить видео
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Загрузка видео</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Icon name="Upload" className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">Перетащи видео сюда или нажми для выбора файла</p>
                <p className="text-xs text-gray-500 mt-2">Максимальный размер: 100МБ</p>
              </div>
              <div className="flex space-x-2 justify-end">
                <Button variant="outline" onClick={() => {}}>Отмена</Button>
                <Button onClick={handleUploadVideo} disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Icon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                      Загрузка...
                    </>
                  ) : (
                    "Загрузить"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Чат-лента */}
      <Card className="flex flex-col h-full">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                  {message.sender === "coach" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=coach" alt="Тренер" />
                      <AvatarFallback>ТР</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div>
                    <div className={`rounded-lg p-3 mb-1 ${
                      message.sender === "user" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-white border border-gray-200"
                    }`}>
                      {message.content}
                      
                      {message.hasVideo && (
                        <div className="mt-2 bg-blue-50 rounded p-2 flex items-center gap-2">
                          <Icon name="Video" className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-blue-700">Видео с тренировки</span>
                        </div>
                      )}
                    </div>
                    <div className={`text-xs text-gray-500 ${message.sender === "user" ? "text-right" : ""}`}>
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {/* Шаблоны быстрых ответов */}
        <div className="p-4 border-t border-gray-200">
          <div className="mb-2 flex gap-2 overflow-x-auto pb-2">
            <Badge variant="outline" className="whitespace-nowrap">Быстрые ответы:</Badge>
            {quickResponses.map((response, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                className="whitespace-nowrap"
                onClick={() => setNewMessage(response)}
              >
                {response}
              </Button>
            ))}
          </div>
          
          {/* Форма отправки сообщения */}
          <div className="flex gap-2">
            <Textarea 
              placeholder="Напиши сообщение тренеру..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Icon name="Send" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
