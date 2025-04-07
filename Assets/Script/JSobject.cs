using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using WebSocketSharp;
using WebSocketSharp.Server;

public class JSobject : MonoBehaviour
{
    public class Echo : WebSocketBehavior
    {
        protected override void OnOpen()
        {
            base.OnOpen();
            Debug.Log(ID);
        }
        protected override void OnMessage (MessageEventArgs e)
        {
            Debug.Log(e.Data);
            Send (e.Data);
        }
    }
    private WebSocketServer wsServer;
    public int port = 8080;
    public List<string> keys = new List<string>{ };
    
    
    // Start is called before the first frame update
    void Start()
    {
        wsServer = new WebSocketServer(port);
        wsServer.AddWebSocketService<Echo>("/");
        wsServer.Start();
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
