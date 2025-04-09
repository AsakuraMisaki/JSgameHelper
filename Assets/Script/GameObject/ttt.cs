using System;

namespace Name
{ 
  namespace a{
    [Serializable]
    public class A { 
      public bool t;
    }
  }
}

namespace B{
  public class A { 
    Name.a.A temp;
  }
}