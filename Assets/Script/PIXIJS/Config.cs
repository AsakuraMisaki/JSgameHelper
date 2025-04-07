using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
namespace PIXIJS{
    [CreateAssetMenu(fileName = "config", menuName = "PIXIJS/config", order = 0)]
    [Serializable]
    public class Config : ScriptableObject
    {
        [Serializable]
        public class Ref{
            public GameObject prefab;

        }

        public Ref Container;
        public Ref Sprite;
        public Ref Text;
        public Ref Graphics;
        public Ref Spine;
    }
}

