// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


//--- PUNTO/CIRCULO ---//
vec3 punto(float radio,vec2 centro,vec2 res){
    //in: radio, el centro, resolucion
    vec2 cenPto= centro;
    float rad= radio;
    
    float d=distance(cenPto,res); //calcula distancia de la resolucion pantalla al centro 
   
    vec3 c= vec3(smoothstep(radio+0.003,radio,d)); //realiza un paso smooth en el radio
    return c;
}//----------//

//----- principal -----//
void main() {
    vec2 resolucion = gl_FragCoord.xy/u_resolution.xy;
    
    vec2 centro_display= vec2(0.5); //centro del display


    //COLORES JUNTOS = BLANCO
    float radioMatriz=0.348; //radio de la matriz
  	vec3 color; //color en pantalla
  
  	for(float i=0.0;i<360.0;i+=30.0){
        vec2 pos; //posicion de los puntos
        pos.x= radioMatriz * cos(radians(i)); //pos en X
        pos.y= radioMatriz * sin(radians(i)); //pos en Y
          
        color+= punto(0.020, pos+centro_display, resolucion);  //cada pto es sumada a la variable color
    }
    
    gl_FragColor = vec4(color,1.0);    
    
    
 /*  
	//COLORES SEPARADOS - R,G,B//    
    vec3 radioMatriz= vec3 (0.20, 0.25, 0.30); //radio de la matriz
    vec3 rotacion= vec3 (0.0,15.0,0.0); // rotacion de cada color
  	
    float r,g,b; //colores rojo verde azul
    for(float i=0.0;i<360.0;i+=30.0){
        vec2 posR= vec2(radioMatriz.r * cos(radians(i + rotacion.r)), radioMatriz.r * sin(radians(i + rotacion.r))); //posicion de los puntos Rojos
        vec2 posG= vec2(radioMatriz.g * cos(radians(i+ rotacion.g)), radioMatriz.g * sin(radians(i+ rotacion.g))); //posicion de los puntos Verdes
        vec2 posB= vec2(radioMatriz.b * cos(radians(i+ rotacion.b)), radioMatriz.b * sin(radians(i+ rotacion.b))); //posicion de los puntos Azules
        
        r+= punto(0.020, posR+centro_display, resolucion).r;  //cada pto es sumada a la variable color
        g+= punto(0.020, posG+centro_display, resolucion).g;
        b+= punto(0.020, posB+centro_display, resolucion).b;
    }
    
    gl_FragColor = vec4(r,g,b,1.0);
 */   
}