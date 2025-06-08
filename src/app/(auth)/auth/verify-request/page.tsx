import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/shared/ui/button";

export default function VerificationRequestPage() {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4 md:p-6">
      <Card className="w-full max-w-md mx-auto py-2 md:py-4">
        <CardHeader className="flex flex-col items-center pt-4 md:pt-8">
          <Mail className="w-12 h-12 text-primary mb-4 animate-pulse" />
          <CardTitle className="text-2xl text-center">Проверьте почту</CardTitle>
          <CardDescription className="text-center mt-2">
            Мы отправили письмо со ссылкой для входа на ваш адрес электронной почты.
            Перейдите по ссылке в письме, чтобы завершить вход.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 pb-8 pt-4">
          <Button asChild variant="link">
            <Link href="/">
              Вернуться на главную
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
