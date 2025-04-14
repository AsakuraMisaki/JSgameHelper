using System;
using UnityEngine;
using System.Collections.Generic;
using Sirenix.OdinInspector;
namespace PIXIJS_Component
{
[Serializable]
public class Text : Container
{
[TextArea(4, 10)]
public string _text = "";
public bool formatter = true;
public TextStyle style;

}

}
