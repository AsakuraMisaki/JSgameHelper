using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Sirenix.OdinInspector;
using UnityEngine;
using AA;

namespace PIXIJS
{
    public class Components : MonoBehaviour
    {
        //Context:Options:Define
        [Serializable]
        public class LayoutScope23
        {
            
            public enum dirs{ Horizontal, Vertical }
            [Serializable]
            public class Options
            {
                CC a;
                public Dictionary<string, Context> temp;
                public Regex rrr;
                
                public dirs _dir;
                public GameObject re;
            }
            
        }
        //Context:Options:Define

        //Context:Enum
        public enum ComponentStatic { 
            Container, Slider, Button, SideFlag, 
        }
        //Context:Enum
        [Serializable]
        public class Component
        {
            [EnumPaging]
            public ComponentStatic target;

            //Context:Options
            [ShowIf("target", ComponentStatic.Slider)]
            public LayoutScope23.Options sliderProperties;
            //Context:Options
        }

        public List<Component> components;
    }
}

