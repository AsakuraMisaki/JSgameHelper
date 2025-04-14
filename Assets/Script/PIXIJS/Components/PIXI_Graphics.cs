using System;
using UnityEngine;
using System.Collections.Generic;
using Sirenix.OdinInspector;
namespace PIXIJS_Component
{
[Serializable]
public class Graphics : Container
{
[EnumPaging]
 public GraphicsType type;
public float ax = 0.5f;
public float ay = 0.5f;
public Color color;
[ShowIf("type", GraphicsType.Circle)]
public float radius = 10f;
[ShowIf("type", GraphicsType.Rect)]
public float round = 5f;
public float width = 20f;
public float height = 20f;

}

}
