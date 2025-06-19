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
