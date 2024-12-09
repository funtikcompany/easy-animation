
 document.addEventListener('DOMContentLoaded', () => {

     const { Engine, Render, World, Bodies } = Matter;
    
     const engine = Engine.create();
     const world = engine.world;
    
     // Шляхи до зображень квітів
     const flowerImages = {
       sunflower: 'img/sunflower.svg',
       palm: 'img/palm.svg',          
       flower: 'img/flower.svg'      
     };
    
     let currentFlowerType = 'sunflower'; // Тип квітки за замовчуванням
     let flowers = []; // Масив для зберігання квітів
     const scene = document.getElementById('scene');
     function getSceneDimensions() {
      const width = scene.clientWidth;
      const height = scene.clientHeight;
      return { width, height };
  }
  let { width, height } = getSceneDimensions();
    
     const render = Render.create({
       element: document.getElementById('scene'),
       engine: engine,
       options: {
        width: width,
        height: height,
         wireframes: false,
         background: 'transparent',
       }
     });
     
    
     Render.run(render);
     Engine.run(engine);
    
     // "Підлога"
     const ground = Bodies.rectangle(render.options.width / 2, render.options.height - 10, render.options.width, 20, {
       isStatic: true,
       render: { fillStyle: 'transparent' }
     });

    //  Стіни
     const wallThickness = 50;
     const leftWall = Bodies.rectangle(-wallThickness / 2 + 20, render.options.height / 2, wallThickness, render.options.height, {
       isStatic: true,
       render: { fillStyle: 'transparent' }
     });
     const rightWall = Bodies.rectangle(render.options.width + wallThickness / 2-20, render.options.height / 2, wallThickness, render.options.height, {
       isStatic: true,
       render: { fillStyle: 'transparent' }
     });
     World.add(world, [ground, leftWall, rightWall]);
    
     // Функція для створення квітки
     function createFlower() {
       const size = 50; // Розмір квітки
       const x = Math.random() * render.options.width ;
       const flower = Bodies.rectangle(x, -size, size, size, {
         render: {
           sprite: {
             texture: flowerImages[currentFlowerType],
             xScale: size / 100, 
             yScale: size / 100
           }
         },
         restitution: 0.5,
            friction: 0.1,
            density: 0.001
       });
       World.add(world, flower);
       flowers.push(flower);
     }
    
     // Функція для запуску генерації квітів
     function generateFlowers() {
      const sceneWidth = scene.clientWidth;
      const numFlowers =   Math.floor(30 + Math.random() * sceneWidth > 768 ? 51 :30); // Випадкове число від 30 до 50 для мобільних, 10 для десктопів
  
       for (let i = 0; i < numFlowers; i++) {
         // Затримка між створенням квіток для кращого візуального ефекту
         setTimeout(createFlower, i * 10);
       }
     }
    
     // Функція для зміни типу квітки
     function changeFlowerType(type) {
       currentFlowerType = type;
       removeAllFlowers();
       generateFlowers();
     }
    
     // Видалення всіх квітів зі сцени
     function removeAllFlowers() {
       for (let i = 0; i < flowers.length; i++) {
         Matter.World.remove(world, flowers[i]);
       }
       flowers = [];
     }
    
     // Обробники подій для кнопок
     document.getElementById('sunflowerBtn').addEventListener('click', () => {
       changeFlowerType('sunflower');
     });
    
     document.getElementById('palmBtn').addEventListener('click', () => {
       changeFlowerType('palm');
     });
    
     document.getElementById('flowerBtn').addEventListener('click', () => {
       changeFlowerType('flower');
     });
 })