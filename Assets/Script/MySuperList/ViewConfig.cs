using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace ScriptableList
{
    [CreateAssetMenu(fileName = "viewConfig", menuName = "CustomGraph/config", order = 0)]
    public class ViewConfig : ScriptableObject
    {
        public static ViewConfig instance;
        public VisualTreeAsset visualTreeAsset;
    }
}

