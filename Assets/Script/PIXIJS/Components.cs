using System;
using System.Collections;
using System.Collections.Generic;
using Sirenix.OdinInspector;
using UnityEngine;

namespace PIXIJS
{
    public class Components : MonoBehaviour
    {
        //Context:Options:Define
        [Serializable]
        public class LayoutScope
        {
            
            public enum dirs{ Horizontal, Vertical }
            [Serializable]
            public class Options
            {
                [EnumPaging]
                public dirs _dir;
                
            }
            
        }
        //Context:Options:Define

        //Context:Enum
        public enum ComponentStatic { Container, Slider, Button, SideFlag }
        //Context:Enum
        [Serializable]
        public class Component
        {
            [EnumPaging]
            public ComponentStatic target;

            //Context:Options
            [ShowIf("target", ComponentStatic.Slider)]
            public LayoutScope.Options sliderProperties;
            //Context:Options
        }

        public List<Component> components;
    }
}

