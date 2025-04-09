
using System;
using Sirenix.OdinInspector;
using UnityEngine;
using UnityEngine.UI;

namespace PIXIJS
{
    public class Context : MonoBehaviour
    {
        
        
        [Button]
        private void Sync()
        {
            var image = GetComponent<Image>();
            Context[] contexts = GetComponentsInChildren<Context>();
            foreach (Context context in contexts)
            {
                var c = context.GetComponent<Components>();
                Type type = c.GetType();
                var props = type.GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);
                foreach(var p in props)
                {
                    Debug.Log(p.Name + ": " + p.GetValue(c));
                }
            }
        }

        void SyncStaticData2Client()
        {
            
        }

    }
}

