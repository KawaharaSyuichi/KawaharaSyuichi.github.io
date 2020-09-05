// ページの読み込みを待つ
window.addEventListener('load', main);

function main() {
    // サイズを指定
    const width = 500;
    const height = 200;
    // 1辺あたりに配置するオブジェクトの個数
    const CELL_NUM = 10;
    const speed = 0.5;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#CubeCanvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0xFFFFFF, 1.0);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(40, width / height);
    camera.position.set(0, 0, 50);

    // 空のジオメトリを作成
    const geometry = new THREE.Geometry();
    // Box
    for (let i = 0; i < CELL_NUM; i++) {
        for (let j = 0; j < CELL_NUM; j++) {
            for (let k = 0; k < CELL_NUM; k++) {
                if (i == 0 || i == CELL_NUM - 1 || j == 0 || j == CELL_NUM - 1 || k == 0 || k == CELL_NUM - 1) {
                    // 立方体個別の要素を作成
                    const meshTemp = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));
                    // XYZ座標を設定
                    meshTemp.position.set(
                        (2 * (i - CELL_NUM / 2)),
                        (2 * (j - CELL_NUM / 2)),
                        (2 * (k - CELL_NUM / 2))
                    );
                    // メッシュをマージ（結合）
                    geometry.mergeMesh(meshTemp);
                }
            }
        }
    }

    const meshTemp = new THREE.Mesh(new THREE.SphereGeometry(4, 10, 10));
    meshTemp.position.set(0, 0, 0);
    geometry.mergeMesh(meshTemp);


    // マテリアルを作成
    const material = new THREE.MeshNormalMaterial();
    // メッシュを作成
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    tick();
    // 毎フレーム時に実行されるループイベントです
    function tick() {
        mesh.rotation.x += (Math.PI / 180) * speed;
        mesh.rotation.y += (Math.PI / 180) * speed;
        mesh.rotation.z += (Math.PI / 180) * speed;
        // レンダリング
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}
