using UnityEditor.Experimental.GraphView;
using UnityEngine;
using UnityEngine.UIElements;

namespace ScriptableList
{
    public class MyCustomNode : Node
{
    public MyCustomNode()
    {
        title = "My Node";
        
        // 添加输入端口
        var inputPort = Port.Create<Edge>(
            Orientation.Horizontal, 
            Direction.Input, 
            Port.Capacity.Single, 
            typeof(float));
        inputPort.portName = "Input";
        inputContainer.Add(inputPort);
        
        // 添加输出端口
        var outputPort = Port.Create<Edge>(
            Orientation.Horizontal, 
            Direction.Output, 
            Port.Capacity.Multi, 
            typeof(float));
        outputPort.portName = "Output";
        outputContainer.Add(outputPort);
        
        // 添加内容区域
        var valueField = new FloatField("Value");
        mainContainer.Add(valueField);
    }
}
}
