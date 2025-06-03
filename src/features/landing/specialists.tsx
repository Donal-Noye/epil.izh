'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { motion } from 'framer-motion';

const items = [
  {
    name: 'Дерендеева Лейсан',
    role: 'Специалист по лазерной эпиляции/электролог',
  },
  {
    name: 'Юлия Шадманова',
    role: 'Мастер Лазерной Эпиляции',
  },
  {
    name: 'Сакерина Софья',
    role: 'Мастер Лазерной Эпиляции',
  },
  {
    name: 'Петрова Диана',
    role: 'Мастер Лазерной Эпиляции',
  },
];

export function Specialists() {
  return (
    <section className="container pb-6 md:pb-28">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Специалисты
      </h2>
      <div className="mt-6 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
              delay: index * 0.1,
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Card className="w-full max-w-md mx-auto sm:max-w-full gap-2 sm:gap-6">
              <CardHeader className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="https://placehold.co/340x340" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.role}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button className="w-full">Записаться</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
