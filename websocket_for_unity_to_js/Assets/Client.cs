using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using WebSocketSharp;
using WebSocketSharp.Net;
 
public class Client : MonoBehaviour
{
    WebSocket ws;
    List<string> memberlist = new List<string>();
    List<string> motionlist = new List<string>();

    void Start(){
        string receive;

        ws = new WebSocket("ws://localhost:443/");
 
        ws.OnOpen += (sender, e) =>
        {
            Debug.Log("ws connected");
        };

        ws.OnMessage += (sender, e) =>
        {
            receive = e.Data;
            Debug.Log(receive.Length);
            for(int i = 0; i < receive.Length; i++){
                if(i / 2 == 0){
                    memberlist.Add(receive[i].ToString());
                    Debug.Log(receive[i].ToString());
                }else{
                    motionlist.Add(receive[i].ToString());
                }
            }
            Debug.Log(memberlist);
            Debug.Log(motionlist);
        };
 
        ws.OnClose += (sender, e) =>
        {
            Debug.Log("WebSocket Close");
        };

        ws.Connect();
 
    }
 
    void Update()
    {
        if (Input.GetKeyUp("1")){
            Debug.Log("1");
            ws.Send("1");
        }
        if(Input.GetKeyUp("2")){
            Debug.Log("2");
            ws.Send("2");
        }
 
    }
 
    void OnDestroy()
    {
        ws.Close();
        ws = null;
    }
}