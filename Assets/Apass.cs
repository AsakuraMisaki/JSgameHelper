using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

public class Apass : MonoBehaviour
{
    public class TTT: ScriptableRenderPass{
        public override void Execute(ScriptableRenderContext context, ref RenderingData renderingData)
        {
            Debug.Log("TTT");
        }
    }
    // Start is called before the first frame update
    void Start()
    {
        UniversalAdditionalCameraData data = GetComponent<UniversalAdditionalCameraData>();
        data.scriptableRenderer.EnqueuePass(new TTT());
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
