using System;
using UnityEngine;
using Sirenix.OdinInspector;
namespace PIXIJS_Component
{
namespace Layouts
{
[Serializable]
public enum dirs
{
Horizontal,Vertical,
}
[Serializable]
public class Layout : PIXIfeatureComponent
{
[EnumPaging]
 public Layouts.dirs _dir;
public bool _needLayout = false;
public Layouts.Vec2 margin;
public float maxCols = 4294967296;
public SizeFlag ttt;

}
[Serializable]
public class Vec2
{
public float _x = 0;
public float _y = 0;

}

}

}
