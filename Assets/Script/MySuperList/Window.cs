using UnityEditor;
using UnityEngine;
using UnityEditor.Experimental.GraphView;
using UnityEngine.UIElements;
namespace ScriptableList
{
    public class Window : EditorWindow
    {
        ViewConfig viewConfig;

    // bool groupEnabled;
    // bool myBool = true;
    // float myFloat = 1.23f;
    
        [MenuItem("Window/My Custom Graph")]
        public static void ShowWindow()
        {
            var window = GetWindow<Window>("My Graph");
            
        }

        void OnGUI()
        {
            viewConfig = (ViewConfig) CustomObjectField ("config", viewConfig, typeof(ViewConfig), (newObj)=>{
                if(viewConfig != null)
                {
                    ViewConfig.instance = viewConfig;
                    // RefreshGraphViews();
                }
            });
        }

        public static Object CustomObjectField(string label, Object obj, System.Type objType, System.Action<Object> onChange)
        {
            EditorGUILayout.BeginHorizontal();
            EditorGUILayout.PrefixLabel(label);
            
            var newObj = EditorGUILayout.ObjectField(obj, objType, true, GUILayout.ExpandWidth(true));
            EditorGUILayout.EndHorizontal();
            if (newObj != obj)
            {
                onChange?.Invoke(newObj);
                
            }
            return newObj;
        }

        public void RefreshGraphViews()
        {
            var graphView = new MyCustomGraph(); // 你的 GraphView 实现
            graphView.style.flexGrow = 1;
            // Debug.Log(ViewConfig.instance);
            // var visualTree = ViewConfig.instance.visualTreeAsset;
            // var root = visualTree.CloneTree();
            // graphView.Add(root);
            rootVisualElement.Add(graphView);
        }   

        private void OnEnable()
        {
            
        }
    }
}
