using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor.Experimental.GraphView;
using UnityEngine.UIElements;
namespace ScriptableList
{
    public class MyCustomGraph : GraphView
    {
        public MyCustomGraph()
        {
            this.AddManipulator(new ContentZoomer());
        this.AddManipulator(new ContentDragger());
        this.AddManipulator(new SelectionDragger());
        this.AddManipulator(new RectangleSelector());
        
        // 添加网格背景
        var grid = new GridBackground();
        Insert(0, grid);
        grid.StretchToParentSize();
        
        // 添加样式
        // styleSheets.Add(Resources.Load<StyleSheet>("GraphViewStyles"));
        
        // 添加默认节点
        AddElement(CreateStartNode());
        }

        private Node CreateStartNode()
    {
        var node = new Node
        {
            title = "配置入口",
            viewDataKey = "config-entry-node"
        };
        
        // 设置节点位置
        node.SetPosition(new Rect(0, 0, 200, 150));
        
        // 添加输出端口
        var outputPort = Port.Create<Edge>(
            Orientation.Horizontal, 
            Direction.Output, 
            Port.Capacity.Multi, 
            typeof(bool));
        outputPort.portName = "输出";
        node.outputContainer.Add(outputPort);
        
        return node;
    }

        

        // private void SetupContextMenu()
        // {
        //     // 添加右键创建节点菜单
        //     this.AddManipulator(new ContextualMenuManipulator(menuEvent =>
        //     {
        //         menuEvent.menu.AppendAction("Create Node", action =>
        //         {
        //             var newNode = new MyCustomNode();
        //             newNode.SetPosition(new Rect(action.eventInfo.mousePosition, Vector2.zero));
        //             AddElement(newNode);
        //         });
        //     }));
        // }

    }
}