import Container from '@/components/ui/Container';

interface FooterProps {
  title: string;
  currentYear?: number;
}

export default function Footer({ title, currentYear = new Date().getFullYear() }: FooterProps) {
  return (
    <footer className="bg-slate-800 text-white py-8 mt-auto">
      <Container size="lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-orange-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="font-semibold">{title}</span>
          </div>
          
          <div className="text-sm text-slate-400">
            © {currentYear} {title}. Todos los derechos reservados.
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              Términos de Servicio
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
