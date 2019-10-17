using UnityEngine;
using System.Collections;
using WebSocketSharp;
using WebSocketSharp.Net;
 
public class Client : MonoBehaviour
{
 
    WebSocket ws;
 
    void Start()
    {
        ws = new WebSocket("ws://localhost:3000/");
 
        ws.OnOpen += (sender, e) =>
        {
            Debug.Log("WebSocket Open");
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
 
        if (Input.GetKeyUp("s"))
        {
            Debug.Log("Pressed [S] key");
            ws.Send("Client Pressed [S] key");
        }
 
    }
 
    void OnDestroy()
    {
        ws.Close();
        ws = null;
    }
}