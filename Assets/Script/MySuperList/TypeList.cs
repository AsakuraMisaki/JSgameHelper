using System;
using System.Collections;
using System.Collections.Generic;
using Sirenix.OdinInspector;
using Unity.VisualScripting;
using UnityEditor.Experimental.GraphView;
using UnityEngine;

namespace ScriptableList
{
    public class TypeList : MonoBehaviour
    {
        
        public enum Behvs { Assign, Operation, Delete, Call, Return }
        public enum Type { Local, Global, QuickG, Number, String, Boolean }
        public enum QuickG { Variable, GetStateCount, GetPlayerSprite, GetPlayer, GetState, UseSkill, BreakSkill, CheckDie }
        
        [Button]
        void Attacher()
        {
            var children = GetComponentsInChildren<Transform>();
            foreach(var child in children){
                if(child.GetComponent<Local>() != null) continue;
                Destroy(child);
            }
            foreach (var l in list)
            {
                
                if (l.beh == Behvs.Assign)
                {
                    var a = l.assignScope;
                    var p1 = a.getter;
                    var p2 = a.setter;
                    refreshGlobalRef(p1);
                    refreshGlobalRef(p2);
                }
            }
        }
        void refreshGlobalRef(TypeListContext.Param p)
        {
            if (p.type != Type.Global) return;
            var g = new GameObject("(Global)" + p.fff);
            g.transform.parent = transform;
        }

        [Button]
        void Define(string name)
        {
            var children = GetComponentsInChildren<Transform>();
            foreach(var child in children){
                if(child.gameObject.name == name) return;
            }
            var g = new GameObject(name);
            g.transform.parent = transform;
            g.AddComponent<Local>();
        }

        [Button]
        void Make(){
            foreach(var obj in list)
            {
                var result = "";
                if(obj.beh == Behvs.Assign){
                    var left = obj.assignScope.getter;
                    var right = obj.assignScope.setter;
                    if(left.type == Type.Local && left.target){
                        result += $"Local.{left.target.gameObject.name}";
                    }
                    if(right.type == Type.Global && right.fff.Length != 0){
                        result += $" = Global.{right.fff}";
                    }
                }
                else if(obj.beh == Behvs.Operation){
                    var left = obj.operationScope.left;
                    var right = obj.operationScope.right;
                    var op = obj.operationScope.tryTo;
                    if(left.type == Type.Local && left.target){
                        result += $"Local.{left.target.gameObject.name}";
                    }
                    if(right.type == Type.Global && right.fff.Length != 0){
                        result += $"{op} Global.{right.fff}";
                    }
                }
                else if(obj.beh == Behvs.Call){
                    var left = obj.callScope.theThis;
                    var right = obj.callScope.target;
                    if(left.type == Type.Local && left.target){
                        result += $"Local.{left.target.gameObject.name}";
                    }
                    if(right.type == Type.Global && right.fff.Length != 0){
                        result += $" = Global.{right.fff}";
                    }
                }
                Debug.Log(result);
            }
        }

        [Serializable]
        public class TypeListContext
        {

            [Serializable]
            public class Param
            {
                [EnumToggleButtons]
                public Type type;

                [ShowIf("type", Type.Local)]

                public Local target;

                [ShowIf("type", Type.Global)]
                public string fff;

                
                [ShowIfGroup("type", Type.QuickG)]
                [EnumPaging]
                public QuickG built; 
                [ShowIfGroup("type", Type.QuickG)]
                public List<string> args;
                

                [ShowIf("type", Type.Number)]
                public float num;

                [ShowIf("type", Type.String)]
                public string str;

                [ShowIf("type", Type.Boolean)]
                public bool state;

            }

            [Serializable]
            public class AssignScope
            {
                public Param getter;
                public Param setter;
            }

            [Serializable]
            public class OperationScope
            {
                public Param left;
                public string tryTo;
                public Param right;
            }

            [Serializable]
            public class CallScope
            {
                public Param theThis;
                public Param target;
            }

            [Serializable]
            public class ReturnScope
            {
                public Param target;
            }


            [EnumPaging]
            public Behvs beh;
            [ShowIf("beh", Behvs.Assign)]
            public AssignScope assignScope;
            [ShowIf("beh", Behvs.Operation)]
            public OperationScope operationScope;
            [ShowIf("beh", Behvs.Call)]
            public CallScope callScope;
            [ShowIf("beh", Behvs.Return)]
            public ReturnScope returnScope;
        }

        [ListDrawerSettings(ShowIndexLabels = true, DraggableItems = true, Expanded = true)]
        public List<TypeListContext> list;
    }
}

