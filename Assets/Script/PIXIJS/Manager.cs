using Sirenix.OdinInspector;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using WebSocketSharp;
using WebSocketSharp.Server;
using Random = UnityEngine.Random;


namespace PIXIJS
{
    [ExecuteInEditMode]
    public class Manager : MonoBehaviour
    {
        public class Echo : WebSocketBehavior
        {
            protected override void OnOpen()
            {
                base.OnOpen();
                Debug.Log(ID);
            }
            protected override void OnMessage(MessageEventArgs e)
            {
                Debug.Log(e.Data);
                Send(e.Data);
            }
        }

        
        
        
        private WebSocketServer wsServer;
        [TitleGroup("WebSocket", "服务器")]
        public int port = 8080;
        public string projectPath = string.Empty;
        [InfoBox("websocket is running", InfoMessageType.Warning, "running")]
        
        [TitleGroup("FakeSync", "伪同步相关")]
        // public Image screenShot;
        // public GameObject container;
        [ReadOnly]
        public bool running = false;

        
        [ButtonGroup]
        private void _Refresh()
        {
            Debug.Log(projectPath);
        }

        [ButtonGroup]
        private void _Reset()
        {
            StartWebSocket();
        }

        void StartWebSocket()
        {
            if(wsServer == null)
            {
                StartCoroutine(CheckRunning());
                wsServer = new WebSocketServer(port);
                wsServer.AddWebSocketService<Echo>("/");
            }
            if(wsServer.IsListening)
            {
                wsServer.Stop();    
            }
            else
            {
                wsServer.Start();
            }
            running = wsServer.IsListening;
        }

        // Start is called before the first frame update
        void Start()
        {
            
        }

        IEnumerator CheckRunning()
        {
            
            while(true)
            {
                running = wsServer != null && wsServer.IsListening;
                yield return new WaitForSecondsRealtime(0.5f);
            }
            
        }

        void OnDestroy()
        {
            wsServer.Stop();
            wsServer = null;
            Debug.Log("destroy");
        }

        // Update is called once per frame
        void Update()
        {
            // 
        }
    }
}

