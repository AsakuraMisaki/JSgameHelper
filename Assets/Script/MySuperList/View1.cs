using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEditor.Experimental.GraphView;
using UnityEngine;
using UnityEngine.UIElements;

namespace ScriptableList
{
    
    public class View1 : EditorWindow
{
    [MenuItem("Window/Graph1")]
    public static void Open()
    {
        GetWindow<View1>("Graph");
        
    }

        void OnEnable()
        {
            RefreshGraphViews();
        }

        public GraphView fafa(){
            return new MyCustomGraph();
        }

        public void RefreshGraphViews()
    {
        var graphView = new MyCustomGraph(); // 你的 GraphView 实现
        graphView.style.flexGrow = 1;
        // Debug.Log(ViewConfig.instance);
        // var visualTree = ViewConfig.instance.visualTreeAsset;
        // var root = visualTree.CloneTree();
        // graphView.Add(root);
        rootVisualElement.Add(graphView
        );
        
    }
}
}
