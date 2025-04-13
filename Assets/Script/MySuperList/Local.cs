using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ScriptableList
{
    
    namespace TTT{
        namespace AAA{
            [Serializable]
            public class AAAList{
                public int AAAListID;
            }
            public class AAAListB : TTT.AAA.AAAList{

            }
        }
    }
    public class Local : MonoBehaviour
    {
        public TTT.AAA.AAAList aAAList;
    }

    public class TCZZC : TTT.AAA.AAAList
    {
        public TTT.AAA.AAAList aAAList;
    }
}

