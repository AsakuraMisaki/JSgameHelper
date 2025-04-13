using System;

namespace PIXIJS_Component
{
  namespace Layout
  {
    namespace temp
    
    {
      [Serializable]
      public class T
      {

      }

    }
    
    public interface A
    {

    }
    [Serializable]
    public class B : Layout.A
    {

    }
    [Serializable]
    public class LayoutS : PIXIfeatureComponent
    {
      public Layout.dirs _dir;
      public bool _needLayout = false;
      public float maxCols = 4294967296;

    }
    [Serializable]
    public class Vec2
    {
      public float _x = 0;
      public float _y = 0;

    }
    [Serializable]
    public enum dirs
    {
      Horizontal, Vertical,
    }

  }
  [Serializable]
  public class Component
  {

  }
  [Serializable]
  public class EV
  {

  }
  [Serializable]
  public class PIXIfeatureComponent : Component
  {

  }
  [Serializable]
  public class SizeFlag : PIXIfeatureComponent
  {

  }

}
