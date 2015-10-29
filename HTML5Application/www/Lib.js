////////////////////////////////////////////////////////////////////////////////
//                                  Vector3f                                  //
////////////////////////////////////////////////////////////////////////////////
var Vector3f = function(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
};
Vector3f.prototype.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};
Vector3f.prototype.add = function(vec3) {
    return new Vector3f(this.x + vec3.x, this.y + vec3.y, this.z + vec3.z);
};
Vector3f.prototype.sub = function(vec3) {
    return new Vector3f(this.x - vec3.x, this.y - vec3.y, this.z - vec3.z);
};
Vector3f.prototype.scale = function(scale) {
    return new Vector3f(this.x * scale, this.y * scale, this.z * scale);
};
Vector3f.prototype.normalize = function() {
    return new Vector3f(this.x/this.length(), this.y/this.length(), this.z/this.length());
};

////////////////////////////////////////////////////////////////////////////////
//                                  Vector2f                                  //
////////////////////////////////////////////////////////////////////////////////
var Vector2f = function(x, y){
    this.x = x;
    this.y = y;
};
Vector2f.prototype.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};
Vector2f.prototype.add = function(vec3) {
    return new Vector3f(this.x + vec3.x, this.y + vec3.y);
};
Vector2f.prototype.sub = function(vec3) {
    return new Vector3f(this.x - vec3.x, this.y - vec3.y);
};
Vector2f.prototype.scale = function(scale) {
    return new Vector3f(this.x * scale, this.y * scale);
};
Vector2f.prototype.normalize = function() {
    return new Vector3f(this.x/this.length(), this.y/this.length());
};
Vector2f.prototype.rotate = function(degrees) {
    angle = Math.atan2(this.x, this.y)/Math.PI*180 + degrees;
    return new Vector2f(Math.sin(angle*Math.PI/180)*this.length(), Math.cos(angle*Math.PI/180)*this.length());
};