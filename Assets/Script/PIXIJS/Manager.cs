using Sirenix.OdinInspector;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace PIXIJS
{
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
        [TitleGroup("FakeSync", "伪同步相关")]
        public Image screenShot;
        public GameObject container;
        public float runTime = 0;

        
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

            if(wsServer != null)
            {
                wsServer.Stop();
                wsServer = null;
            }
            else
            {
                wsServer = new WebSocketServer(port);
                wsServer.AddWebSocketService<Echo>("/");
                wsServer.Start();
                StartCoroutine(GC());
            }
        }

        
        IEnumerator GC()
        {
            runTime = 0f;
            while (true)
            {
                if (!wsServer.IsListening)
                {
                    Debug.Log("stop");
                    yield break;
                }
                runTime += Time.deltaTime;
                yield return new WaitForSeconds(0.1f);
            }
        }

        // Start is called before the first frame update
        void Start()
        {
            
        }

        // Update is called once per frame
        void Update()
        {

        }
    }
}

