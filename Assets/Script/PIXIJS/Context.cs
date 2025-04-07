
using Sirenix.OdinInspector;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace PIXIJS
{
    public class Context : MonoBehaviour
    {

        [Button]
        private void Refresh()
        {
            var image = GetComponent<Image>();
            
        }

        //Context:Options:Define
        [Serializable]
        public class SliderProperties
        {
            public GameObject bar;
            public GameObject slider;
            public GameObject bg;
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
            public SliderProperties sliderProperties;
            //Context:Options
        }
        
        public List<Component> components;
    }
}

