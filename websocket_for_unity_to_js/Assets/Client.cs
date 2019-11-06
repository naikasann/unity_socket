using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using WebSocketSharp;
using WebSocketSharp.Net;
 
public class Client : MonoBehaviour
{
    WebSocket ws;

    void Start()
    {
        ws = new WebSocket("ws://localhost:443/");
 
        ws.OnOpen += (sender, e) =>
        {
            Debug.Log("ws connected");
        };
        ws.OnMessage += (sender, e) =>
        {
            Debug.Log("WebSocket Message Type: " + ", Data: " + e.Data);
        };

        ws.OnError += (sender, e) =>
        {
            Debug.Log("WebSocket Error Message: " + e.Message);
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