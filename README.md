# WebGL
https://dl.dropboxusercontent.com/u/19425296/WebSites/index.html <hr>
http://glslsandbox.com/e#28328.3 <hr>
http://glslsandbox.com/e#28175.0 <hr>
http://glslsandbox.com/e#27980.1 <hr>
http://glslsandbox.com/e#27510.0 <hr>
http://glslsandbox.com/e#27413.1 <hr>
http://glslsandbox.com/e#26733.0 <hr>
http://glslsandbox.com/e#26752.5 <hr>
http://glslsandbox.com/e#26551.0 <hr>
http://glslsandbox.com/e#26322.0 <hr>
http://glslsandbox.com/e#26306.0 <hr>
http://glslsandbox.com/e#26307.0
<hr>
#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

#define MAX_ITER 200

void main() {
    	int iter = 0;
	vec2 f = 4.0*gl_FragCoord.xy/resolution-vec2(2.0,2.0);
	vec2 c = vec2(sin(time), cos(time));
	
	for(int i = 0; i < MAX_ITER; i++){
		vec2 t;
		t.x = f.x * f.x - f.y * f.y + c.x;
		t.y = 2.0 * f.x * f.y + c.y;
		f = t;
		iter++;
		if(f.x * f.x + f.y * f.y >= 4.0 || iter == 200)
			break;
	}
	float color = float(iter)/50.0;
	if(iter == 200)
   		gl_FragColor = vec4(0,0,0, 1.0);
	else
		gl_FragColor = vec4(color,color,color, 1.0);
}
