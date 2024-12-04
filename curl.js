function curl(x, y, z, noiseFunc){
  let eps = 0.001;
  let n1, n2 = 0;

  //Find rate of change in X direction
  n1 = noiseFunc(x + eps, y, z);
  n2 = noiseFunc(x - eps, y, z);

  //Average to find approximate derivative
  let a = (n1 - n2)/(2 * eps);

  //Find rate of change in Y direction
  n1 = noiseFunc(x, y + eps, z);
  n2 = noiseFunc(x, y - eps, z);

  //Average to find approximate derivative
  let b = (n1 - n2)/(2 * eps);

  //Curl
  return createVector(b, -a);
}