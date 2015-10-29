# WebGL
<!DOCTYPE html>
<html>
    <head>
        <link rel="icon" type="image/x-icon" href="./favicon.ico"> 
        <title>Open GL</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <script id = "shader-vs" type="x-shader/x-vertex">
            attribute vec3 position;
            varying vec3 pos;
            void main() {
                pos = position;
                //gl_PointSize = 5.0;
                gl_Position = vec4(position, 1.0);
            }
        </script>

        <script id = "shader-fs" type = "x-shader/x-fragment">
            precision highp float;
            uniform float zoom;
            uniform vec2 offset;
            uniform int maxIter;
            varying vec3 pos;
            
            void main() {
                vec2 z = vec2(0,0);
                vec2 c = zoom*gl_FragCoord.xy/vec2(800, 800)+offset;
//                mi = maxIter;
                int iter;
                for(int i = 0; i <= 200; i++)
                {
                    vec2 tz = z;
                    tz.x = z.x * z.x - z.y * z.y + c.x;
                    tz.y = 2.0 * z.x * z.y + c.y;
                    z.x = tz.x;
                    z.y = tz.y;
                    iter = i;
                    if(z.x * z.x + z.y * z.y > 4.0)
                        break;
                }
                float f = float(iter)/50.0;
                if(iter == 200)
                    gl_FragColor = vec4(0, 0, 0, 1);
                else
                    gl_FragColor = vec4(f, f, f, 1);
            }
        </script>
        <script src = "Lib.js"></script>
        <script>
            var program;
            var gl;
            var zoom = 2;
            var offset = new Vector2f(-1.5,-1);
            var goalPoint = new Vector2f(-0.75, 0.1);
            var iter = 200;
            var canvas;
            function webGLStart() {
                canvas = document.getElementById('canvas');
//                addEventListener("keydown", canvasKey, true);
                gl = canvas.getContext('webgl');
                gl.enable(gl.DEPTH_TEST);
                gl.clearColor(1, 0, 1, 1);
                
                var vertexShader = gl.createShader(gl.VERTEX_SHADER);
                gl.shaderSource(vertexShader, document.getElementById("shader-vs").textContent);
                gl.compileShader(vertexShader);
                var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
                gl.shaderSource(fragmentShader, document.getElementById("shader-fs").textContent);
                gl.compileShader(fragmentShader);
                program = gl.createProgram();
                gl.attachShader(program, vertexShader);
                gl.attachShader(program, fragmentShader);
                gl.linkProgram(program);
                render();
            }
            
            function getMousePos(canvas, evt){
                var rect = canvas.getBoundingClientRect();
                return {
                    x: evt.clientX - rect.left,
                    y: evt.clientY - rect.top
                };
            }
            
            function animation(){
//                var pos = getMousePos(canvas, e);
//                posx = (pos.x/800)+0.5;
//                posy = (pos.y/800)+0.5;
                var posx = document.getElementById('xPoint').value;
                var posy = document.getElementById('yPoint').value;
                zoom/=1.01;
                offset = new Vector2f(-1.5+posx*zoom/2, -1.0*zoom/2);
//                offset = offset.add(new Vector2f(goalPoint.x*(zoom-1.5),goalPoint.y*(zoom-1.5)));
                render();
            }
            function render(){
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                
                var vertices = new Float32Array([
                    -1, -1, 0,
                    -1, 1, 0,
                    1, -1, 0,
                    1, 1, 0,
                    -1, 1, 0,
                    1, -1, 0
                ]);
//                var vertices = new Float32Array(10000);
//                
//                for(i = 0; i < 10000; i++){
//                    vertices[i] = 2*(Math.random()-0.5);
//                }
                var buffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
                gl.useProgram(program);
                //program.color = gl.getUniformLocation(program, 'color');
                //gl.uniform4fv(program.color, [0, 1, 0, 1.0]);
                program.maxIter = gl.getUniformLocation(program, 'maxIter');
                gl.uniform1f(program.maxIter, iter);
                program.zoom = gl.getUniformLocation(program, 'zoom');
                gl.uniform1f(program.zoom, zoom);
                
                program.offset = gl.getUniformLocation(program, 'offset');
                gl.uniform2f(program.offset, offset.x, offset.y);
                program.position = gl.getAttribLocation(program, 'position');
                gl.enableVertexAttribArray(program.position);
                gl.vertexAttribPointer(program.position, 3, gl.FLOAT, false, 0, 0);
                
                gl.drawArrays(gl.TRIANGLES, 0, vertices.length/3);
            }
            
            function canvasKey(event){
                zoom = 2;
                offset = new Vector2f(-1.5*zoom/2, -1.0*zoom/2);
                render();
            }
            function zoomMandel(){
                if(!animate)
                    animate = setInterval(animation,5);
                else{
                    window.clearInterval(animate);
                    animate = null;
                }
            }
            function reset(){
                if(animate){
                    window.clearInterval(animate);
                    animate = null;
                }
                zoom = 2;
                offset = new Vector2f(-1.5*zoom/2, -1.0*zoom/2);
                render();
            }
//            vec2 = new Vector2f(0, 1);
            var animate;
            function canvasClick(event){
//                if(!animate)
//                    animate = setInterval(function(){animation(event);},5);
//                else{
//                    window.clearInterval(animate);
//                    animate = null;
//                }
//                offset = new Vector2f(-1.5-0.75*zoom/2, -1.0*zoom/2);
////                offset = offset.add(new Vector2f(goalPoint.x*(zoom-1.5),goalPoint.y*(zoom-1.5)));
//                zoom/=1.1;
//                render();
//                vec2 = vec2.rotate(90);
//                document.getElementById("content").innerHTML = "X: " + vec2.x + " Y: " + vec2.y;
                //canvas.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                //canvas.width = 1920;
                //canvas.height = 1080;
            }
        </script>
    </head>
    <body onload = "webGLStart()">
        <canvas id="canvas" style="border: none; margin: 1em"
                width="800" height="800" onclick="canvasClick(event)"></canvas>
        <hr>
        <input id = "xPoint" type = "text" value = "-0.75">
        <input id = "yPoint" type = "text" value = "-0.1">
        <button type = "button" onclick="zoomMandel();">Zoom</button>
        <button type = "button" onclick="reset();">Reset</button>
    </body>
</html>
