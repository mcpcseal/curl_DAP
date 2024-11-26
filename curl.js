function curl(i, j, noiseArray, width){
  let eps = 1;
  let n1, n2 = 0;

  //Find rate of change in X direction
  i1 = index2D(i + eps, j, width);
  i2 = index2D(i - eps, j, width);
  n1 = noiseArray[i1];
  n2 = noiseArray[i2];

  //Average to find approximate derivative
  let a = (n1 - n2)/(2 * eps);

  //Find rate of change in Y direction
  i1 = index2D(i, j + eps, width);
  i2 = index2D(i, j - eps, width);
  n1 = noiseArray[i1];
  n2 = noiseArray[i2]; 

  //Average to find approximate derivative
  let b = (n1 - n2)/(2 * eps);

  //Curl
  return createVector(b, -a);
}