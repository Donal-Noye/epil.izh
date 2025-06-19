import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      id: "user-001",
      email: "anna@example.com",
      name: "Анна Лазерова",
      role: "SPECIALIST",
      image: "https://placehold.co/340x340"
    },
  });
  const user2 = await prisma.user.create({
    data: {
      id: "user-002",
      email: "irina@example.com",
      name: "Ирина Гладкова",
      role: "SPECIALIST",
      image: "https://placehold.co/340x340"
    },
  });
  const user3 = await prisma.user.create({
    data: {
      id: "user-003",
      email: "maria@example.com",
      name: "Мария Эстетова",
      role: "SPECIALIST",
      image: "https://placehold.co/340x340"
    },
  });
  const user4 = await prisma.user.create({
    data: {
      id: "user-004",
      email: "diana@example.com",
      name: "Диана Петрова",
      role: "SPECIALIST",
      image: "https://placehold.co/340x340"
    },
  });

  await prisma.specialist.createMany({
    data: [
      {
        id: "spec-001",
        userId: user1.id,
        name: user1.name as string,
        position: "Специалист по лазерной эпиляции/электролог",
        bio: "Сертифицированный специалист по лазерной эпиляции с 5-летним опытом.",
        image: user1.image,
      },
      {
        id: "spec-002",
        userId: user2.id,
        name: user2.name as string,
        position: "Мастер Лазерной Эпиляции",
        bio: "Профессионал в области красоты. Индивидуальный подход к каждому клиенту.",
        image: user2.image,
      },
      {
        id: "spec-003",
        userId: user3.id,
        name: user3.name as string,
        position: "Мастер Лазерной Эпиляции",
        bio: "Работает на новейшем оборудовании, делает кожу идеально гладкой.",
        image: user3.image,
      },
      {
        id: "spec-004",
        userId: user4.id,
        name: user4.name as string,
        position: "Мастер Лазерной Эпиляции",
        bio: "Работает на новейшем оборудовании, делает кожу идеально гладкой.",
        image: user4.image,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.service.createMany({
    data: [
      {
        id: "service-001",
        name: "Лазерная эпиляция лица",
        description: "Эффективное удаление волос с зоны лица",
        price: 1500,
        durationMin: 30,
      },
      {
        id: "service-002",
        name: "Лазерная эпиляция ног",
        description: "Комплексная обработка ног до бедра",
        price: 3000,
        durationMin: 60,
      },
      {
        id: "service-003",
        name: "Лазерная эпиляция подмышек",
        description: "Быстрая и безболезненная процедура",
        price: 1000,
        durationMin: 15,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Услуги успешно созданы");
  console.log("✅ Seed выполнен успешно.");
}

main()
  .catch((e) => {
    console.error("❌ Ошибка при сидировании:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
