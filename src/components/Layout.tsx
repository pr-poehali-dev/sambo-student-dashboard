
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Главная", icon: "Home" },
    { path: "/materials", label: "Учебные материалы", icon: "BookOpen" },
    { path: "/video-tasks", label: "Видеозадания", icon: "Video" },
    { path: "/chat", label: "Чат с тренером", icon: "MessageSquare" },
    { path: "/progress", label: "Мой прогресс", icon: "BarChart2" },
    { path: "/challenges", label: "Челленджи", icon: "Award" },
    { path: "/help", label: "Помощь", icon: "HelpCircle" },
    { path: "/profile", label: "Профиль", icon: "User" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Верхняя панель */}
      <header className="bg-white border-b border-slate-200 py-2 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="https://images.unsplash.com/photo-1565846273985-42ea434eabb6?q=80&w=100&auto=format&fit=crop" 
            alt="Самбо-Интерактив" 
            className="h-10 w-10 rounded-full mr-2" 
          />
          <span className="font-bold text-blue-700 hidden sm:inline">Самбо-Интерактив</span>
        </div>
        
        <Link to="/profile" className="flex items-center gap-2">
          <span className="text-sm text-gray-600 hidden sm:inline">Мой профиль</span>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop" alt="Аватар" />
            <AvatarFallback>ГО</AvatarFallback>
          </Avatar>
        </Link>
      </header>

      {/* Боковое меню и контент */}
      <div className="flex flex-1">
        {/* Боковая навигация */}
        <nav className="bg-white border-r border-slate-200 w-16 md:w-56 flex-shrink-0">
          <div className="flex flex-col h-full py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 mx-2 my-1 rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-slate-100"
                )}
              >
                <Icon name={item.icon} className="h-5 w-5 flex-shrink-0" />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Основной контент */}
        <main className="flex-1 bg-gray-50 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
