import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';

class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#three-canvas'),
            antialias: true,
            alpha: true
        });
        
        // 初始化鼠标位置和面光源
        this.mouse = new THREE.Vector2();
        this.mouseLight = null;
        
        // 初始化面光源
        RectAreaLightUniformsLib.init();
        
        this.init();
        this.loadModel();
        this.animate();
        this.addEventListeners();
    }

    init() {
        // 設置渲染器
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.physicallyCorrectLights = true;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.5;
        
        // 設置相機位置
        this.camera.position.z = 50;
        
        // 添加主環境光
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);
        
        // 添加藍色環境光
        const blueAmbientLight = new THREE.AmbientLight(0x0055ff, 1.2);
        this.scene.add(blueAmbientLight);
        
        // 添加主光源（偏暖色）
        const mainLight = new THREE.DirectionalLight(0xffffff, 3.5);
        mainLight.position.set(5, 5, 5);
        this.scene.add(mainLight);

        // 添加蓝色面光源
        const blueAreaLight = new THREE.RectAreaLight(0x0066ff, 3.0, 20, 20);
        blueAreaLight.position.set(-5, 5, -5);
        blueAreaLight.lookAt(0, 0, 0);
        this.scene.add(blueAreaLight);

        // 添加顶部紫色面光源
        const purpleTopAreaLight = new THREE.RectAreaLight(0x9933ff, 4.5, 25, 25);
        purpleTopAreaLight.position.set(0, 15, 0);
        purpleTopAreaLight.lookAt(0, 0, 0);
        this.scene.add(purpleTopAreaLight);

        // 添加左侧柠檬黄面光源
        const yellowSideAreaLight = new THREE.RectAreaLight(0xF2FFAD, 2.5, 75, 75);
        yellowSideAreaLight.position.set(-45, 0, 5);
        yellowSideAreaLight.lookAt(0, 0, 0);
        this.scene.add(yellowSideAreaLight);

        // 添加额外的紫色环境光
        const purpleAmbientLight = new THREE.AmbientLight(0x9933ff, 0.5);
        this.scene.add(purpleAmbientLight);

        // 添加跟随鼠标的红色面光源
        this.mouseLight = new THREE.RectAreaLight(0xff0000, 5.0, 20, 20);  // 颜色，强度，宽度，高度
        this.mouseLight.position.set(0, 0, 20);
        this.mouseLight.lookAt(0, 0, 0);
        this.scene.add(this.mouseLight);

        console.log('Scene initialized');
    }

    loadModel() {
        console.log('Loading model...');
        
        const loader = new GLTFLoader();
        loader.load(
            'src/assets/models/logo.gltf',
            (gltf) => {
                console.log('Model loaded successfully');
                this.model = gltf.scene;
                
                // 調整模
                this.model.scale.set(0.3, 0.3, 0.3);
                this.model.rotation.x = 0;
                this.model.position.y = -30;
                
                // 設置金屬藍材質
                const metalMaterial = new THREE.MeshPhysicalMaterial({
                    color: 0x000000,        // 黑色基底
                    metalness: 0.9,         // 高金屬感
                    roughness: 0.2,         // 較光滑
                    transmission: 0,        // 不透光
                    envMapIntensity: 1.5,   // 增強環境反射
                    clearcoat: 1,           // 清漆層
                    clearcoatRoughness: 0.1, // 清漆層光滑
                    reflectivity: 1.0,      // 高反射率
                    ior: 3.0,               // 高折射率
                    specularIntensity: 1.5, // 增強高光
                    specularColor: 0x99ccff // 保持藍色高光
                });
                
                // 創建環境貼圖
                const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
                pmremGenerator.compileEquirectangularShader();
                
                // 創建高質量環境貼圖
                const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024);
                const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
                this.scene.add(cubeCamera);
                
                // 應用材質
                this.model.traverse((child) => {
                    if (child.isMesh) {
                        child.material = metalMaterial;
                        child.material.envMap = cubeRenderTarget.texture;
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                
                this.scene.add(this.model);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.error('Error loading model:', error);
            }
        );
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        if (this.model) {
            this.model.rotation.y += 0.005;
        }
        
        this.updateMouseLight();  // 在每帧更新光源位置
        
        this.renderer.render(this.scene, this.camera);
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // 添加鼠标移动事件监听
        document.addEventListener('mousemove', (event) => {
            // 将鼠标位置归一化为 -1 到 1 之间
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
        });
    }

    // 更新鼠标光源位置
    updateMouseLight() {
        if (this.mouseLight) {
            // 将鼠标坐标转换为3D空间坐标
            const x = (this.mouse.x * window.innerWidth / 2);
            const y = -(this.mouse.y * window.innerHeight / 2);
            this.mouseLight.position.set(x/10, y/10, 20);
            
            // 使面光源始终朝向模型
            this.mouseLight.lookAt(0, 0, 0);
        }
    }
}

export default Scene; 