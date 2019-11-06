using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using WebSocketSharp;
using WebSocketSharp.Net;
 
public class Client : MonoBehaviour
{
    WebSocket ws;
    List<string> receive_list = new List<string>();

    void Start(){
        string temp_receive;

        ws = new WebSocket("ws://localhost:443/");
 
        ws.OnOpen += (sender, e) =>
        {
            Debug.Log("ws connected");
        };

        ws.OnMessage += (sender, e) =>
        {
            temp_receive = e.Data;
            for(int i = 0; i < temp_receive.Length; i++){
                if(!(i % 2 == 1)){
                    receive_list.Add(temp_receive[i].ToString());
                }
            }
            Debug.Log(receive_list);
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