import Scene from './scene.js';

document.addEventListener('DOMContentLoaded', () => {
    // 圖片加載檢查
    const images = document.querySelectorAll('img');
    console.log('Found images:', images.length);
    
    images.forEach(img => {
        console.log('Checking image:', img.src);
        
        img.addEventListener('error', (e) => {
            console.error('Image failed to load:', {
                src: e.target.src,
                alt: e.target.alt,
                naturalWidth: e.target.naturalWidth,
                naturalHeight: e.target.naturalHeight
            });
        });
        
        img.addEventListener('load', (e) => {
            console.log('Image loaded successfully:', {
                src: e.target.src,
                alt: e.target.alt,
                naturalWidth: e.target.naturalWidth,
                naturalHeight: e.target.naturalHeight
            });
        });

        // 立即檢查已經加載的圖片
        if (img.complete) {
            console.log('Image already loaded:', {
                src: img.src,
                alt: img.alt,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight
            });
        }
    });

    // 初始化 3D 場景
    new Scene();

    // 動畫入場效果
    const serviceTypes = document.querySelectorAll('.service-type');
    
    setTimeout(() => {
        serviceTypes.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('active');
            }, index * 200);
        });
    }, 500);

    // 滑鼠移動效果
    const neonEffect = document.querySelector('.neon-effect');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        gsap.to(neonEffect, {
            duration: 0.8,
            x: x - neonEffect.offsetWidth / 2,
            y: y - neonEffect.offsetHeight / 2,
            ease: 'power2.out'
        });
    });
});