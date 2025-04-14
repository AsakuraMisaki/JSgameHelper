using System;
using UnityEngine;
using System.Collections.Generic;
using Sirenix.OdinInspector;
namespace PIXIJS_Component
{
[Serializable]
public class TextStyle
{
private List<string> values_1 = new List<string>(){"left","center","right"};
[ValueDropdown("values_1")]
public string align = "left";
public bool breakWords;
public bool dropShadow;
public float dropShadowAlpha;
public float dropShadowAngle;
public float dropShadowBlur;
public Color dropShadowColor;
public float dropShadowDistance;
public Color fill;
public string fontFamily;
public float fontSize;
private List<string> values_2 = new List<string>(){"normal","bold","light"};
[ValueDropdown("values_2")]
public string fontStyle = "normal";
public float letterSpacing;
public float lineHeight;
public float padding;
public Color stroke;
public float strokeThickness;
private List<string> values_3 = new List<string>(){"alphabetic","top","hanging","middle","ideographic","bottom"};
[ValueDropdown("values_3")]
public string textBaseline = "alphabetic";
public bool trim;
public bool wordWrap;
public bool charWrap;
public float wordWrapWidth;
public float leading;

}

}
